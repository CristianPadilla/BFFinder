package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.entity.PostImageEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
import com.cpadilla.adoptionpostservice.exception.PetNotFoundException;
import com.cpadilla.adoptionpostservice.exception.PostNotFoundException;
import com.cpadilla.adoptionpostservice.external.client.ImageService;
import com.cpadilla.adoptionpostservice.external.client.LocationService;
import com.cpadilla.adoptionpostservice.external.client.PetService;
import com.cpadilla.adoptionpostservice.external.client.UserService;
import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.repository.AdoptionPostRepository;
import com.cpadilla.adoptionpostservice.repository.PostImageRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Log4j2
public class AdoptionPostServiceImpl implements AdoptionPostService {

    @Autowired
    private AdoptionPostRepository repository;

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private PetService petService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    @Autowired
    private AdoptionPostFilterSpecification<AdoptionPostEntity> filterSpecification;


    @Override
    public AdoptionPostResponse getAdoptionPostById(int postId) {
        var postEntity = repository.findById(postId)
                .orElseThrow(() -> new CustomException("Adoption post not found with id: " + postId, "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var petResponse = petService.getById(postEntity.getPetId()).getBody();
        var petDetails = PetResponse.builder()
                .id(petResponse.getId())
                .name(petResponse.getName())
                .weight(petResponse.getWeight())
                .age(petResponse.getAge())
                .vaccinated(petResponse.isVaccinated())
                .dangerous(petResponse.isDangerous())
                .size(petResponse.getSize())
                .sterilized(petResponse.isSterilized())
                .dewormed(petResponse.isDewormed())
                .userOwnerResponse(petResponse.getUserOwnerResponse())
                .breedDetails(petResponse.getBreedDetails())
                .build();

        var locationResponse = locationService.getById(postEntity.getAddressId()).getBody();
//        var locationDetails = LocationDetails.builder()
//                .id(locationResponse.getId())
//                .city(locationResponse.getCity())
//                .build();

        var images = findPostImages(postId);

        return AdoptionPostResponse.builder()
                .id(postEntity.getId())
                .description(postEntity.getDescription())
                .date(postEntity.getDate())
                .petResponse(petDetails)
                .locationResponse(locationResponse)
                .images(images)
                .build();
    }

    @Override
    public int savePost(PostRequest request) {
        var adoptionPostRequest = request.getAdoptionPostRequest();
        var petId = 0;

        var isPublished = repository.findByPetIdAndStatusIsTrue(adoptionPostRequest.getPetId()).isPresent();
        if (isPublished) // verify if pet already has a post
            throw new CustomException("Pet is already published", "POST_ALREADY_EXIST", HttpStatus.CONFLICT.value());

        petId = petService.getById(adoptionPostRequest.getPetId()).getBody().getId();

        if (petId == 0)
            throw new PetNotFoundException("Not possible to create adoption post, specified pet not found with id " + adoptionPostRequest.getPetId());

        var user = userService.getUserById(request.getUserId()).getBody();

        var addressId = 0;
        if (adoptionPostRequest.getLocation() == null) addressId = user.getLocation().getId();
        else addressId = locationService.saveAddress(adoptionPostRequest.getLocation()).getBody();

        var postEntity = AdoptionPostEntity.builder()
                .description(adoptionPostRequest.getDescription())
                .status(true)
                .date(Instant.now())
                .petId(petId)
                .userId(request.getUserId())
                .addressId(addressId)
                .build();
        var createdPost = repository.save(postEntity);

        //todo  solicitar creacion de imagenes al microservicio


        //todo registrar en la tabla intermedia


        return createdPost.getId();
    }

    @Override
    public Page<AdoptionPostPartialsResponse> getPostsByUserIdFilter(int userId, PostsRequest request) {

        var pageSize = request.getPageSize() > 0 && request.getPageSize() <= 20
                ? request.getPageSize()
                : 10;

        boolean tsFilters = request.getFilters() != null;

        var postFilters = PostFilters.builder()
                .fromDate(tsFilters ? request.getFilters().getFromDate() : null)
                .specificDate(true)
                .status(tsFilters ? request.getFilters().getStatus() : null)
                .userId(userId)
                .build();

        var petFilters = PetFilters.builder()
                .breedId(tsFilters ? request.getFilters().getBreedId() : 0)
                .specieId(tsFilters ? request.getFilters().getSpecieId() : 0)
                .build();

        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters

        var postEntities = repository
                .findAll(specification, PageRequest.of(request.getPage(), pageSize));

        List<AdoptionPostPartialsResponse> filteredPosts;
        filteredPosts = postEntities.stream()
                .map(post -> {
                    var pet = petService.getById(post.getPetId()).getBody();
                    var petDetails = PetPartialResponse.builder()
                            .id(pet.getId())
                            .name(pet.getName())
                            .age(pet.getAge())
                            .size(pet.getSize())
                            .breedDetails(pet.getBreedDetails())
                            .build();
                    return AdoptionPostPartialsResponse.builder()
                            .id(post.getId())
                            .date(post.getDate())
                            .status(post.isStatus())
                            .petPartialResponse(petDetails)
                            .build();
                })
                .filter(post -> passesPetFilters(post.getPetPartialResponse(), petFilters))
                .filter(post -> passesPostFilters(post, postFilters))
                .collect(Collectors.toList());

        var sortingField = request.getSorting() != null ? request.getSorting().getSort() : null;
        var sortingDetails = Sort.by(Sort.Order.by("date"));
        if (sortingField != null && !sortingField.isEmpty()) {

            var comparator = switch (sortingField) {
                case "date" -> Comparator.comparing(AdoptionPostPartialsResponse::getDate);
                case "name" ->
                        Comparator.comparing((AdoptionPostPartialsResponse post) -> post.getPetPartialResponse().getName());
                case "age" ->
                        Comparator.comparing((AdoptionPostPartialsResponse post) -> post.getPetPartialResponse().getAge());
                default ->
                        throw new CustomException("Sorting criteria is not valid", "SORTING_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            };
            if (request.getSorting().isDesc()) {
                comparator = comparator.reversed();
                sortingDetails = Sort.by(Sort.Order.desc(sortingField));
            } else sortingDetails = Sort.by(Sort.Order.by(sortingField));

            filteredPosts.sort(comparator);

        } else filteredPosts.sort(Comparator.comparing(AdoptionPostPartialsResponse::getDate).reversed());

        return new PageImpl<>(filteredPosts, PageRequest.of(request.getPage(), pageSize, sortingDetails), filteredPosts.size());
    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc) {

        var postEntities =
                repository.findAllByStatusTrue(Sort.by("date").descending());

        if (postEntities.size() > 0) {
            return postEntities.stream()
                    .map(post -> {
                        var pet = petService.getById(post.getPetId()).getBody();
                        var petDetails = PetPartialResponse.builder()
                                .id(pet.getId())
                                .name(pet.getName())
                                .breedDetails(pet.getBreedDetails())
                                .build();

                        var locationResponse = locationService.getById(post.getAddressId()).getBody();
                        var locationDetails = LocationPartialResponse.builder()
                                .id(locationResponse.getId())
                                .city(locationResponse.getCity())
                                .build();

                        var images = findPostImages(post.getId());

                        return AdoptionPostPartialsResponse.builder()
                                .id(post.getId())
                                .petPartialResponse(petDetails)
                                .locationResponse(locationDetails)
                                .date(post.getDate())
                                .images(images)
                                .build();
                    })
                    .collect(Collectors.toList());
        } else throw new PostNotFoundException("not available posts for user with id ");

    }

    @Override
    public Page<AdoptionPostPartialsResponse> getAllFilter(PostsRequest request) {
        var pageSize = request.getPageSize() > 0 && request.getPageSize() <= 20
                ? request.getPageSize()
                : 10;

        boolean tsFilters = request.getFilters() != null;// there is filters?

        var postFilters = PostFilters.builder()
                .departmentId(tsFilters ? request.getFilters().getDepartmentId() : 0)
                .cityId(tsFilters ? request.getFilters().getCityId() : 0)
                .fromDate(tsFilters ? request.getFilters().getFromDate() : null)
                .status("A")
                .build();

        var petFilters = PetFilters.builder()
                .breedId(tsFilters ? request.getFilters().getBreedId() : 0)
                .specieId(tsFilters ? request.getFilters().getSpecieId() : 0)
                .size(tsFilters ? request.getFilters().getSize() : null)
                .build();

        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters
        var postEntities =
                repository.findAll(specification, PageRequest.of(request.getPage(), pageSize));

        List<AdoptionPostPartialsResponse> filteredPosts;

        filteredPosts = postEntities.stream().map(post -> {
                    var pet = petService.getById(post.getPetId()).getBody();
                    var petDetails = PetPartialResponse.builder()
                            .id(pet.getId())
                            .name(pet.getName())
                            .age(pet.getAge())
                            .breedDetails(pet.getBreedDetails())
                            .size(pet.getSize())
                            .build();

                    var locationResponse = locationService.getById(post.getAddressId()).getBody();
                    var locationDetails = LocationPartialResponse.builder()
                            .id(locationResponse.getId())
                            .city(locationResponse.getCity())
                            .build();

                    var images = findPostImages(post.getId());

                    return AdoptionPostPartialsResponse.builder()
                            .id(post.getId())
                            .status(post.isStatus())
                            .date(post.getDate())
                            .petPartialResponse(petDetails)
                            .locationResponse(locationDetails)
                            .images(images)
                            .build();
                }).filter(post -> passesPetFilters(post.getPetPartialResponse(), petFilters))// apply pet filters
                .filter(post -> passesPostFilters(post, postFilters))// post filters
                .collect(Collectors.toList());

        var sortingField = request.getSorting() != null ? request.getSorting().getSort() : null;
        var sortingDetails = Sort.by(Sort.Order.desc("date"));

        if (sortingField != null && !sortingField.isEmpty()) {
            var comparator = switch (sortingField) {
                case "date" -> Comparator.comparing(AdoptionPostPartialsResponse::getDate);
                case "age" ->
                        Comparator.comparing((AdoptionPostPartialsResponse post) -> post.getPetPartialResponse().getAge());

                default ->
                        throw new CustomException("Sorting criteria is not valid", "SORTING_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            };
            if (request.getSorting().isDesc()) {
                comparator = comparator.reversed();
                sortingDetails = Sort.by(Sort.Order.desc(sortingField));
            } else sortingDetails = Sort.by(Sort.Order.by(sortingField));

            filteredPosts.sort(comparator);
        } else filteredPosts.sort(Comparator.comparing(AdoptionPostPartialsResponse::getDate).reversed());

        return new PageImpl<>(filteredPosts, PageRequest.of(request.getPage(), pageSize, sortingDetails), filteredPosts.size());
    }

    @Override
    public int updatePost(AdoptionPostRequest request) {

        var postToUpdate = repository.findById(request.getId())
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + request.getId()));

        var currentLocationDetails = locationService.getById(postToUpdate.getAddressId()).getBody();


        if (!request.getDescription().equals(postToUpdate.getDescription()))
            postToUpdate.setDescription(request.getDescription());

        if (request.getLocation().getCityId() != currentLocationDetails.getCity().getId()) // update city only
            locationService.updateAddress(LocationRequest.builder()
                    .id(currentLocationDetails.getId())
                    .cityId(request.getLocation().getCityId())
                    .build());


        return repository.save(postToUpdate).getId();
    }

    @Override
    public int cancelPost(int postId) {
        AdoptionPostEntity postToUpdate = repository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + postId));

        postToUpdate.setStatus(false);
        return repository.save(postToUpdate).getId();
    }

    @Override
    public boolean checkPetIsPosted(int petId) {
        return repository.findByPetIdAndStatusIsTrue(petId).isPresent();
    }

    @Override
    public List<ImageResponse> findPostImages(int postId) {

        var postImages = postImageRepository.findAllByPostId(postId);

        return postImages.stream().map(postImageEntity ->
                imageService.getImageById(postImageEntity.getImageId()).getBody()

        ).filter(Objects::nonNull).collect(Collectors.toList());
    }

    @Override
    public ImageResponse savePostImage(int postId, MultipartFile image) {
        log.info("saving post image for post id {} from service layer", postId);
        if (!repository.existsById(postId))
            throw new CustomException("Adoption post not found with id: " + postId, "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value());

        var savedImage = imageService.uploadPostImage(postId, image).getBody();

        var postImage = PostImageEntity.builder()
                .imageId(savedImage.getImageId())
                .postId(postId)
                .build();
        postImageRepository.save(postImage);

        return savedImage;
    }

    @Override
    public void cancelPostImage(int postId, int imageId) {
        log.info("deleting post image with id {} for post id {} from service layer", postId, imageId);
        if (postImageRepository.findByPostIdAndImageId(postId, imageId) == null)
            throw new CustomException("No image related to post with id: " + postId, "POST_IMAGE_NOT_FOUND", HttpStatus.NOT_FOUND.value()); // delete portImage registry?

        imageService.deleteImageById(imageId);
    }


    public boolean passesPetFilters(PetPartialResponse petDetails, PetFilters filter) {

        if (filter.getSize() != null && !filter.getSize().isEmpty()) {
            var sizeFilter = filter.getSize().toLowerCase();
            if (sizeFilter.equals("l") || sizeFilter.equals("s") || sizeFilter.equals("m")) {
                if (sizeFilter.charAt(0) != petDetails.getSize()) return false;
            } else
                throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.BAD_REQUEST.value());
        }

        if (filter.getSpecieId() > 0) {
            if (petDetails.getBreedDetails().getSpecie().getId() != filter.getSpecieId()) return false;
            if (filter.getBreedId() != 0 && petDetails.getBreedDetails().getId() != filter.getBreedId())
                return false;
        }
        return true;
    }

    public boolean passesPostFilters(AdoptionPostPartialsResponse postDetails, PostFilters filter) {
        if (filter.getDepartmentId() > 0) {
            if (postDetails.getLocationResponse().getCity().getDepartment().getId() != filter.getDepartmentId())
                return false;
            if (filter.getCityId() != 0 && filter.getCityId() != postDetails.getLocationResponse().getCity().getId())
                return false;
        }
        return true;
    }

}
