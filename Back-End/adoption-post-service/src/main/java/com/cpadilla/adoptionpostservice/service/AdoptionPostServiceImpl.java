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
    public Page<AdoptionPostPartialsResponse> getPostsByUserIdFilter(int userId, PostsByUserFilterRequest filterRequest) {

        var pageSize = filterRequest.getPageSize() > 0 && filterRequest.getPageSize() <= 20
                ? filterRequest.getPageSize()
                : 10;
        var postFilters = PostFilters.builder()
                .fromDate(filterRequest.getFromDate())
                .status(filterRequest.getStatus())
                .build();


        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters

        var postEntities = repository
                .findAllByUserId(userId, PageRequest.of(filterRequest.getPage(), pageSize), specification);

        List<AdoptionPostPartialsResponse> filteredPosts;
        filteredPosts = postEntities.stream()
                .map(post -> {
                    var pet = petService.getById(post.getPetId()).getBody();
                    var petDetails = PetPartialResponse.builder()
                            .id(pet.getId())
                            .name(pet.getName())
                            .age(pet.getAge())
                            .breedDetails(pet.getBreedDetails())
                            .build();
                    return AdoptionPostPartialsResponse.builder()
                            .id(post.getId())
                            .date(post.getDate())
                            .status(post.isStatus())
                            .petPartialResponse(petDetails)
                            .build();
                })
                .filter(post -> passesPetFilters(post.getPetPartialResponse(), PetFilters.builder()
                        .breedId(filterRequest.getBreedId())
                        .specieId(filterRequest.getSpecieId())
                        .build()))
                .filter(post -> passesPostFilters(post, PostFilters.builder()
                        .status(filterRequest.getStatus())
                        .build()))
                .collect(Collectors.toList());

        var sorRequest = filterRequest.getSort();
        Comparator<AdoptionPostPartialsResponse> comparator;

        if (sorRequest != null && !sorRequest.isEmpty()) {
            comparator = switch (filterRequest.getSort()) {
                case "date" -> Comparator.comparing(AdoptionPostPartialsResponse::getDate);
                case "name" -> Comparator.comparing(post -> post.getPetPartialResponse().getName());
                case "age" -> Comparator.comparing(post -> post.getPetPartialResponse().getAge());
                default ->
                        throw new CustomException("Sorting criteria is not valid", "SORTING_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            };
            comparator = filterRequest.isDesc() ? comparator.reversed() : comparator;
        } else comparator = Comparator.comparing(AdoptionPostPartialsResponse::getDate);
        filteredPosts.sort(comparator);

        return new PageImpl<>(filteredPosts, PageRequest.of(filterRequest.getPage(), pageSize), filteredPosts.size());
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
    public Page<AdoptionPostPartialsResponse> getAllFilter(AllPostsFilterRequest filterRequest) {
        var pageSize = filterRequest.getPageSize() > 0 && filterRequest.getPageSize() <= 20
                ? filterRequest.getPageSize()
                : 10;

        var postFilters = PostFilters.builder()
                .cityId(filterRequest.getCityId())
                .status("A")
                .build();
        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters
        var postEntities =
                repository.findAll(specification, PageRequest.of(filterRequest.getPage(), pageSize));

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
                }).filter(post -> passesPetFilters(post.getPetPartialResponse(), PetFilters.builder()
                        .breedId(filterRequest.getBreedId())
                        .specieId(filterRequest.getSpecieId())
                        .size(filterRequest.getSize())
                        .build()))// apply pet filters
                .filter(post -> passesPostFilters(post, postFilters))// post filters
                .collect(Collectors.toList());

        var sort = filterRequest.getSort();
        if (sort != null && !sort.isEmpty()) {
            switch (sort) {
                case "date" -> {
                    if (filterRequest.isDesc())
                        filteredPosts.sort(Comparator.comparing(AdoptionPostPartialsResponse::getDate).reversed());
                    else filteredPosts.sort(Comparator.comparing(AdoptionPostPartialsResponse::getDate));
                }
                case "age" -> {
                    if (filterRequest.isDesc())
                        filteredPosts.sort(Comparator.comparing((AdoptionPostPartialsResponse post) -> post.getPetPartialResponse().getAge()).reversed());
                    else filteredPosts.sort(Comparator.comparing(post -> post.getPetPartialResponse().getAge()));
                }
                default ->
                        throw new CustomException("Sorting criteria is not valid", "SORTING_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            }

        } else filteredPosts.sort(Comparator.comparing(AdoptionPostPartialsResponse::getDate));

        return new PageImpl<>(filteredPosts, postEntities.getPageable(), filteredPosts.size());


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

    public boolean passesPostFilters(AdoptionPostPartialsResponse postResponse, PostFilters filter) {

        if (filter.getCityId() > 0) {
            if (postResponse.getLocationResponse().getCity().getId() != filter.getCityId()) return false;
        }

        return true;
    }

//    public Comparator<AdoptionPostPartialsResponse> applyPetSorting(FilterRequest filterRequest, AdoptionPostPartialsResponse post) {
//        return null;
//
//    }
}
