package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.entity.PostImageEntity;
import com.cpadilla.adoptionpostservice.entity.QuestionEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
import com.cpadilla.adoptionpostservice.exception.PetNotFoundException;
import com.cpadilla.adoptionpostservice.exception.PostNotFoundException;
import com.cpadilla.adoptionpostservice.exception.UnsupportedFileException;
import com.cpadilla.adoptionpostservice.external.client.ImageService;
import com.cpadilla.adoptionpostservice.external.client.LocationService;
import com.cpadilla.adoptionpostservice.external.client.PetService;
import com.cpadilla.adoptionpostservice.external.client.UserService;
import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.repository.AdoptionPostRepository;
import com.cpadilla.adoptionpostservice.repository.PostImageRepository;
import com.cpadilla.adoptionpostservice.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@Log4j2
public class AdoptionPostServiceImpl implements AdoptionPostService {

    @Autowired
    private AdoptionPostRepository repository;

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private QuestionRepository questionRepository;

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

    public static final List<String> allowedImageFormats = Arrays.asList("jpg", "png", "jpeg");


    @Override
    public AdoptionPostResponse getAdoptionPostById(int postId) {
        var postEntity = repository.findById(postId)
                .orElseThrow(() -> new CustomException("Adoption post not found with id: " + postId, "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var post = buidPostFromEntity(postEntity);
        var questionsEntities
                = questionRepository.findAllByPostId(postEntity.getId());
        var questions = questionsEntities
                .stream().map(this::buildQuestionFromEntity).toList();

        post.setQuestions(questions);
        return post;
    }

    @Override
    public AdoptionPostResponse savePost(PostRequest request) {
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
        var date = LocalDate.now();
        var postEntity = AdoptionPostEntity.builder()
                .description(adoptionPostRequest.getDescription())
                .status(true)
                .date(date.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant())
                .petId(petId)
                .userId(request.getUserId())
                .addressId(addressId)
                .build();
        var createdPost = repository.save(postEntity);

        return buidPostFromEntity(createdPost);
    }

    @Override
    public PostsFilteredPageResponse getPostsByUserIdFilter(int userId, PostsRequest request) {

        var pageSize = request.getPageSize() > 0 && request.getPageSize() <= 20
                ? request.getPageSize()
                : 10;

        boolean tsFilters = request.getFilters() != null;

        var postFilters = PostFilters.builder()
                .fromDate(tsFilters ? request.getFilters().getFromDate() : null)
                .specificDate(true)
                .status(tsFilters ? request.getFilters().getStatus() : null)
                .userId(userId)
                .search(request.getSearch())
                .build();

        var petFilters = PetFilters.builder()
                .breedId(tsFilters ? request.getFilters().getBreedId() : 0)
                .specieId(tsFilters ? request.getFilters().getSpecieId() : 0)
                .build();

        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters

        var postEntities = repository.findAll(specification);

        var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<AdoptionPostPartialsResponse> filteredPosts;
        filteredPosts = postEntities.stream()
                .map(post -> {
                    var pet = petService.getById(post.getPetId()).getBody();
                    var petDetails = PetPartialResponse.builder()
                            .id(pet.getId())
                            .name(pet.getName())
                            .age(pet.getAge())
                            .age(pet.getAge())
                            .size(pet.getSize())
                            .profileImageUrl(pet.getProfileImageUrl())
                            .gender(pet.getGender())
                            .breedDetails(pet.getBreedDetails())
                            .build();
                    var questionsQuantity = questionRepository.countByPostId(post.getId());
                    return AdoptionPostPartialsResponse.builder()
                            .id(post.getId())
                            .date(post.getDate())
                            .status(post.isStatus())
                            .petPartialResponse(petDetails)
                            .questionsQuantity(questionsQuantity)
                            .build();
                })
                .filter(post -> passesFilters(post, post.getPetPartialResponse(), petFilters, postFilters))
//                .filter(post -> passesPostFilters(post, postFilters))
                .collect(Collectors.toList());

        var sortingField = request.getSorting() != null ? request.getSorting().getSort() : null;
        var sortingDetails = Sort.by(Sort.Order.desc("date"));
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

        int fromElement = request.getPage() * pageSize;
        int intoElements = Math.min(fromElement + pageSize, filteredPosts.size());
        var pageElements = filteredPosts.subList(fromElement, intoElements);

        var page = new PageImpl<>(pageElements, PageRequest.of(request.getPage(), pageSize, sortingDetails), filteredPosts.size());
        return PostsFilteredPageResponse.builder().page(page).request(request).build();
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
                                .gender(pet.getGender())
                                .breedDetails(pet.getBreedDetails())
                                .profileImageUrl(pet.getProfileImageUrl())
                                .build();

                        var locationResponse = locationService.getById(post.getAddressId()).getBody();
                        var locationDetails = LocationPartialResponse.builder()
                                .id(locationResponse.getId())
                                .city(locationResponse.getCity())
                                .build();

                        var images = findPostImages(post.getId());

                        var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                        String formattedDate = formatter.format(post.getDate().atZone(ZoneId.of("UTC")));

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
    public PostsFilteredPageResponse getAllFilter(PostsRequest request) {
        // TODO !important there is a optimization problem, when getting the posts it will get almost all witch is not optimal
        // options could be to limit the number of posts, wit a limit, or a date limit, or implement filter from pets service  or something
        var pageSize = request.getPageSize() > 0 && request.getPageSize() <= 20
                ? request.getPageSize()
                : 10;

        boolean tsFilters = request.getFilters() != null;// are there any filters?

        var postFilters = PostFilters.builder()
                .departmentId(tsFilters ? request.getFilters().getDepartmentId() : 0)
                .cityId(tsFilters ? request.getFilters().getCityId() : 0)
                .fromDate(tsFilters ? request.getFilters().getFromDate() : null)
                .status("A")
                .search(request.getSearch())
                .build();

        var petFilters = PetFilters.builder()
                .breedId(tsFilters ? request.getFilters().getBreedId() : 0)
                .specieId(tsFilters ? request.getFilters().getSpecieId() : 0)
                .size(tsFilters ? request.getFilters().getSize() : null)
                .age(tsFilters ? request.getFilters().getAge() : 0)
                .gender(tsFilters ? request.getFilters().getGender() : null)
                .search(request.getSearch())
                .build();

        var specification =
                filterSpecification.getSearchSpecification(postFilters); // apply post filters
        var postEntities =
                repository.findAll(specification);

        List<AdoptionPostPartialsResponse> filteredPosts;
        var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        filteredPosts = postEntities.stream().map(post -> {
                    var pet = petService.getById(post.getPetId()).getBody();
                    var petDetails = PetPartialResponse.builder()
                            .id(pet.getId())
                            .name(pet.getName())
                            .gender(pet.getGender())
                            .age(pet.getAge())
                            .profileImageUrl(pet.getProfileImageUrl())
                            .breedDetails(pet.getBreedDetails())
                            .size(pet.getSize())
                            .build();

                    var user = userService.getUserById(post.getUserId()).getBody();
                    var userDetails = UserPartialsResponse.builder()
                            .userId(user.getUserId())
                            .name(user.getName())
                            .email(user.getEmail())
                            .phoneNumber(user.getPhoneNumber())
                            .profileImageUrl(user.getProfileImageUrl())
                            .build();

                    var locationResponse = locationService.getById(post.getAddressId()).getBody();
                    var locationDetails = LocationPartialResponse.builder()
                            .id(locationResponse.getId())
                            .city(locationResponse.getCity())
                            .build();

                    var images = findPostImages(post.getId());
                    var questionsQuantity = questionRepository.countByPostId(post.getId());
                    return AdoptionPostPartialsResponse.builder()
                            .id(post.getId())
                            .status(post.isStatus())
                            .images(images)
                            .date(post.getDate())
                            .petPartialResponse(petDetails)
                            .user(userDetails)
                            .questionsQuantity(questionsQuantity)
                            .locationResponse(locationDetails)
                            .build();
                }).filter(post -> passesFilters(post, post.getPetPartialResponse(), petFilters, postFilters))// apply all filters
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

        int fromElement = request.getPage() * pageSize;
        int intoElements = Math.min(fromElement + pageSize, filteredPosts.size());
        var pageElements = filteredPosts.subList(fromElement, intoElements);

        var page = new PageImpl<>(pageElements, PageRequest.of(request.getPage(), pageSize, sortingDetails), filteredPosts.size());
        return PostsFilteredPageResponse.builder().page(page).request(request).build();
    }

    @Override
    public AdoptionPostResponse updatePostDescription(AdoptionPostRequest request) {

        var postToUpdate = repository.findById(request.getId())
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + request.getId()));

        if (!request.getDescription().equals(postToUpdate.getDescription()))
            postToUpdate.setDescription(request.getDescription());

        return buidPostFromEntity(repository.save(postToUpdate));
    }

    @Override
    public AdoptionPostResponse updatePostAssignedPet(int postId, int petId) {

        if (checkPetIsPosted(petId))
            throw new CustomException("Not possible to update adoption post, specified pet has been already posted ", "PET_ALREADY_POSTED", HttpStatus.CONFLICT.value());

        var postToUpdate = repository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + postId));

        postToUpdate.setPetId(petId);

        return buidPostFromEntity(repository.save(postToUpdate));

    }

    @Override
    public int cancelPost(int postId) {
        AdoptionPostEntity postToUpdate = repository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + postId));

        postToUpdate.setStatus(false);
        return repository.save(postToUpdate).getId();
    }


    @Override
    @Transactional
    public void deletePostByPetId(int petId) {
        log.info("deleting post by pet id {}", petId);
        AdoptionPostEntity postToDelete = repository.findByPetId(petId)
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for petId " + petId));
        postToDelete.setStatus(false);
        deletePostImages(postToDelete.getId());
//        log.info("=========", postToDisable);
        repository.delete(postToDelete);
    }


    @Override
    public boolean checkPetIsPosted(int petId) {
        return repository.findByPetId(petId).isPresent();
    }

    @Override
    public List<ImageResponse> findPostImages(int postId) {

        var postImages = postImageRepository.findAllByPostId(postId);

        return postImages.stream().map(postImageEntity ->
                imageService.getImageById(postImageEntity.getImageId()).getBody()

        ).filter(Objects::nonNull).collect(Collectors.toList());
    }


    @Override
    public List<QuestionResponse> findQuestionsByShelterUserId(int userId) {
        log.info("Getting post questions by shelter user with id", userId);

        var postsIds = repository.findAllByUserIdAndStatusIsTrue(userId)
                .stream().map(AdoptionPostEntity::getId).toList();

        var questions = new ArrayList<QuestionResponse>();
        postsIds.forEach(postId -> {
            var postQuestions = questionRepository.findAllByPostId(postId);
            postQuestions.forEach(questionEntity -> {
                var question = buildQuestionFromEntity(questionEntity);
                var postResponse = getAdoptionPostById(questionEntity.getPostId());
                question.setPost(postResponse);
                questions.add(question);
            });
        });

        return questions;
    }

    @Override
    public int getPendingQuestionsCountByShelter(int userId) {
        log.info("Getting pending questions by shelter user with id {}", userId);
        var postsIds = repository.findAllByUserIdAndStatusIsTrue(userId)
                .stream().map(AdoptionPostEntity::getId).toList();
        final AtomicInteger pendingQuestions = new AtomicInteger(0);
        postsIds.forEach(postId -> {
            var pendingQuestionsPerPost = questionRepository.countAllByPostIdAndAnswerIsNullAndAnswerDateIsNull(postId);
            pendingQuestions.addAndGet(pendingQuestionsPerPost);
        });


        return pendingQuestions.get();
    }

    @Override
    public void deletePostImages(int postId) {
        log.info("deleting post images for post with id {} ", postId);

        postImageRepository.deleteByPostId(postId);
//        var images = findPostImages(postId);
//        log.info("imagesss  id {} ", images);
//        images.forEach(image -> imageService.deleteImageById(image.getImageId()));
    }

    @Override
    public QuestionResponse saveQuestion(QuestionRequest request) {

        if (repository.findByIdAndStatusIsTrue(request.getPostId()).isEmpty())
            throw new CustomException("Adoption post not found with id: " + request.getPostId(), "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value());
        if (!(userService.getUserById(request.getUserId()).getBody().getRole() == 'u'))
            throw new CustomException("User not allowed to make questions: " + request.getUserId(), "USER_NOT_ALLOWED", HttpStatus.NOT_FOUND.value());

        var savedQuestion = questionRepository.save(QuestionEntity.builder()
                .description(request.getQuestion())
                .date(LocalDate.now())
                .userId(request.getUserId())
                .postId(request.getPostId())
                .build());

        return buildQuestionFromEntity(savedQuestion);
    }

    @Override
    public QuestionResponse updateQuestionDescription(String description, int questionId) {
        return null;
    }

    @Override
    public QuestionResponse updateQuestionAnswer(QuestionAnswerUpdateRequest request) {

        var questionToUpdate = questionRepository
                .findById(request.getQuestionId())
                .orElseThrow(() -> new CustomException("Question not found with id: " + request.getQuestionId(), "QUESTION_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        questionToUpdate.setAnswer(request.getAnswer());
        questionToUpdate.setAnswerDate(LocalDate.now());
        questionToUpdate = questionRepository.save(questionToUpdate);
        return buildQuestionFromEntity(questionToUpdate);
    }

    @Override
    public ImageResponse savePostImage(int postId, MultipartFile image) {
        log.info("saving post image for post id {} from service layer", postId);

        var filename = image.getOriginalFilename();
        var extension = filename.substring(filename.lastIndexOf(".") + 1);
        if (!allowedImageFormats.contains(extension)) {
            throw new UnsupportedFileException("The file type/extension is invalid, try a valid image file (png, jpg, jpeg)");
        }

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

    @Override
    public void cleanPostImages(int postId) {
        log.info("cleaning post images for post with id {} ", postId);
        var images = findPostImages(postId);
        log.info("imagesss  id {} ", images);
        images.forEach(image -> imageService.deleteImageById(image.getImageId()));

    }


    public AdoptionPostResponse buidPostFromEntity(AdoptionPostEntity postEntity) {

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
                .gender(petResponse.getGender())
                .profileImageUrl(petResponse.getProfileImageUrl())
                .breedDetails(petResponse.getBreedDetails())
                .build();

        var ownerDetails = userService.getUserById(postEntity.getUserId()).getBody();

        var locationResponse = locationService.getById(postEntity.getAddressId()).getBody();
        var images = findPostImages(postEntity.getId());

        var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = formatter.format(postEntity.getDate().atZone(ZoneId.of("UTC")));
        var questionsQuantity = questionRepository.countByPostId(postEntity.getId());
        return AdoptionPostResponse.builder()
                .id(postEntity.getId())
                .description(postEntity.getDescription())
                .date(formattedDate)
                .petResponse(petDetails)
                .locationResponse(locationResponse)
                .questionsQuantity(questionsQuantity)
                .user(ownerDetails)
                .images(images)
                .build();
    }

    public QuestionResponse buildQuestionFromEntity(QuestionEntity questionEntity) {
        var userResponse = userService.getUserById(questionEntity.getUserId()).getBody();

        var userPartialsResponse = UserPartialsResponse.builder()
                .userId(userResponse.getUserId())
                .name(userResponse.getName())
                .email(userResponse.getEmail())
                .phoneNumber(userResponse.getPhoneNumber())
                .profileImageUrl(userResponse.getProfileImageUrl())
                .build();
        return QuestionResponse.builder()
                .id(questionEntity.getId())
                .question(questionEntity.getDescription())
                .answer(questionEntity.getAnswer())
                .answerDate(questionEntity.getAnswerDate())
                .user(userPartialsResponse)
                .date(questionEntity.getDate())
                .build();
    }

    @Override
    public int enablePost(int postId) {
        AdoptionPostEntity postToUpdate = repository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("The adoption post not found for id " + postId));

        postToUpdate.setStatus(true);
        return repository.save(postToUpdate).getId();
    }

    @Override
    public List<Integer> findAvailablePostedSpecies() {
        List<Integer> availableSpecies = new ArrayList<>();

        var posts = repository.findAllByStatusTrue();
        posts.stream().map(AdoptionPostEntity::getPetId).forEach(petId -> {
            var pet = petService.getById(petId).getBody();
            if (!availableSpecies.contains(pet.getBreedDetails().getSpecie().getId()))
                availableSpecies.add(pet.getBreedDetails().getSpecie().getId());
        });
        return availableSpecies;
    }

    @Override
    public List<Integer> findAvailablePostedBreedsBySpecieId(int specieId) {
        List<Integer> availableBreeds = new ArrayList<>();

        var posts = repository.findAllByStatusTrue();
        posts.stream().map(AdoptionPostEntity::getPetId).forEach(petId -> {
            var pet = petService.getById(petId).getBody();
            if (!availableBreeds.contains(pet.getBreedDetails().getId()))
                availableBreeds.add(pet.getBreedDetails().getId());
        });
        return availableBreeds;
    }


    public boolean passesPetFilters(PetPartialResponse petDetails, PetFilters filter) {
        if (filter.getSize() != null && !filter.getSize().isEmpty()) {
            var sizeFilter = filter.getSize().toLowerCase();
            if (sizeFilter.equals("l") || sizeFilter.equals("s") || sizeFilter.equals("m")) {
                if (sizeFilter.charAt(0) != petDetails.getSize()) return false;
            } else
                throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.BAD_REQUEST.value());
        }
        if (filter.getGender() != null && !filter.getGender().isEmpty()) {
            var genderFilter = filter.getGender().toLowerCase();
            if (genderFilter.equals("f") || genderFilter.equals("m")) {
                if (genderFilter.charAt(0) != petDetails.getGender()) return false;
            } else
                throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.BAD_REQUEST.value());
        }

        if (filter.getSpecieId() > 0) {
            if (petDetails.getBreedDetails().getSpecie().getId() != filter.getSpecieId()) return false;
            if (filter.getBreedId() != 0 && petDetails.getBreedDetails().getId() != filter.getBreedId())
                return false;
        }

        if (filter.getAge() > 0) {
            return petDetails.getAge() <= filter.getAge();
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

    private boolean passesFilters(AdoptionPostPartialsResponse post, PetPartialResponse pet, PetFilters petFilters, PostFilters postFilters) {
        return (passesPetFilters(pet, petFilters)
                && passesPostFilters(post, postFilters)// if it is getPostsByUserIdFilter service, user will come null
                && passesSearchFilter(post.getUser() != null ? post.getUser().getName() : null, pet.getName(), postFilters.getSearch()));
    }

    private boolean passesSearchFilter(String ownerName, String petName, String searchFilter) {// send ownerName if needed to filter only by petName
        if (searchFilter != null && !searchFilter.isEmpty()) {
            var ownerSearchValidation = ownerName == null || ownerName.toLowerCase().contains(searchFilter.toLowerCase());
            var petSearchValidation = petName == null || petName.toLowerCase().contains(searchFilter.toLowerCase());

            log.info("owner {}", ownerSearchValidation);
            log.info("pet {}", petSearchValidation);
            log.info("search {}", searchFilter);
            return ownerName == null
                    ? !searchFilter.isBlank() && (petSearchValidation)
                    : !searchFilter.isBlank() && (petSearchValidation || ownerSearchValidation);
        } else return true;

    }

}
