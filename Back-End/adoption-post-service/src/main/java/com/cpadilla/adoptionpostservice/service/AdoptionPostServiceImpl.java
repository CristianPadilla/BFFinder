package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
import com.cpadilla.adoptionpostservice.exception.LocationNotCreatedException;
import com.cpadilla.adoptionpostservice.exception.PetNotFoundException;
import com.cpadilla.adoptionpostservice.exception.PostNotFoundException;
import com.cpadilla.adoptionpostservice.external.client.LocationService;
import com.cpadilla.adoptionpostservice.external.client.PetService;
import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.repository.AdoptionPostRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class AdoptionPostServiceImpl implements AdoptionPostService {

    @Autowired
    private AdoptionPostRepository repository;

    @Autowired
    private PetService petService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private AdoptionPostFilterSpecification<AdoptionPostEntity> filterSpecification;


    @Override
    public AdoptionPostResponse getAdoptionPostById(int postId) {
        var postEntity = repository.findById(postId)
                .orElseThrow(() -> new CustomException("Adoption post not found with id: " + postId, "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var petResponse = petService.getById(postEntity.getPetId()).getBody();
        var petDetails = PetDetails.builder()
                .id(petResponse.getId())
                .name(petResponse.getName())
                .weight(petResponse.getWeight())
                .age(petResponse.getAge())
                .vaccinated(petResponse.isVaccinated())
                .dangerous(petResponse.isDangerous())
                .size(petResponse.getSize())
                .sterilized(petResponse.isSterilized())
                .dewormed(petResponse.isDewormed())
                .ownerDetails(petResponse.getOwnerDetails())
                .breedDetails(petResponse.getBreedDetails())
                .build();

        var locationResponse = locationService.getById(postEntity.getAddressId()).getBody();
        var locationDetails = LocationDetails.builder()
                .id(locationResponse.getId())
                .city(locationResponse.getCity())
                .build();

        return AdoptionPostResponse.builder()
                .id(postEntity.getId())
                .description(postEntity.getDescription())
                .date(postEntity.getDate())
                .petDetails(petDetails)
                .locationDetails(locationDetails)
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
            throw new PetNotFoundException("Not possible to create adoption| post, specified pet not found with id " + adoptionPostRequest.getPetId());

        var addressId = 0;
        addressId = locationService.saveAddress(adoptionPostRequest.getLocation()).getBody();
        if (addressId == 0)
            throw new LocationNotCreatedException("Not possible to save location at address table");


        var postEntity = AdoptionPostEntity.builder()
                .description(adoptionPostRequest.getDescription())
                .status(true)
                .date(Instant.now())
                .petId(petId)
                .userId(request.getUserId())
                .addressId(addressId)
                .build();
        var createdPost = repository.save(postEntity);

        //todo  solicitar creacion de imagenes al micro

        //todo registrar en la tabla intermedia


        return createdPost.getId();
    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId) {

        var postEntities = repository.findAllByUserIdAndStatusIsTrueOrderByDateDesc(userId);


        if (postEntities.size() > 0) {
            return postEntities.stream()
                    .map(post -> {
                        log.info("post  ========= {}", post.toString());
                        var pet = petService.getById(post.getPetId()).getBody();
                        var petDetails = PetPartialDetails.builder()
                                .id(pet.getId())
                                .name(pet.getName())
                                .breedDetails(pet.getBreedDetails())
                                .build();
                        return AdoptionPostPartialsResponse.builder()
                                .id(post.getId())
                                .petDetails(petDetails)
                                .build();
                    })
                    .collect(Collectors.toList());
        } else throw new PostNotFoundException("not available posts for user with id " + userId);

    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc) {

        var postEntities =
                repository.findAllByStatusTrue(Sort.by("date").descending());


        if (postEntities.size() > 0) {
            return postEntities.stream()
                    .map(post -> {
                        var pet = petService.getById(post.getPetId()).getBody();
                        var petDetails = PetPartialDetails.builder()
                                .id(pet.getId())
                                .name(pet.getName())
                                .breedDetails(pet.getBreedDetails())
                                .build();

                        var locationResponse = locationService.getById(post.getAddressId()).getBody();
                        var locationDetails = LocationDetails.builder()
                                .id(locationResponse.getId())
                                .city(locationResponse.getCity())
                                .build();

                        return AdoptionPostPartialsResponse.builder()
                                .id(post.getId())
                                .petDetails(petDetails)
                                .locationDetails(locationDetails)
                                .date(post.getDate())
                                .build();
                    })
                    .collect(Collectors.toList());
        } else throw new PostNotFoundException("not available posts for user with id ");

    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllFilter(FilterRequest filterRequest) {

        var specification =
                filterSpecification.getSearchSpecification(filterRequest); // apply post filters

        var postEntities =
                repository.findAll(specification, Sort.by("date").descending());

        if (postEntities.size() > 0) {
            return postEntities.stream().map(post -> {
                        var pet = petService.getById(post.getPetId()).getBody();
                        var petDetails = PetPartialDetails.builder()
                                .id(pet.getId())
                                .name(pet.getName())
                                .breedDetails(pet.getBreedDetails())
                                .size(pet.getSize())
                                .build();

                        var locationResponse = locationService.getById(post.getAddressId()).getBody();
                        var locationDetails = LocationDetails.builder()
                                .id(locationResponse.getId())
                                .city(locationResponse.getCity())
                                .build();

                        return AdoptionPostPartialsResponse.builder()
                                .id(post.getId())
                                .status(post.isStatus())
                                .date(post.getDate())
                                .petDetails(petDetails)
                                .locationDetails(locationDetails)
                                .build();
                    }).filter(post -> petPassesFilter(post.getPetDetails(), filterRequest))// apply pet filters
                    .filter(post -> filterRequest.getCityId() != 0 && post.getLocationDetails().getCity().getId() == filterRequest.getCityId())// location filter
                    .collect(Collectors.toList());
        } else throw new PostNotFoundException("not available posts with specified filters");

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


    public boolean petPassesFilter(PetPartialDetails petDetails, FilterRequest filter) {

        if (filter.getSize() != null) {
            var sizeFilter = filter.getSize().toLowerCase();
            if (sizeFilter.equals("l") || sizeFilter.equals("s") || sizeFilter.equals("m")) {
                if (sizeFilter.charAt(0) != petDetails.getSize()) return false;
            } else
                throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.NOT_FOUND.value());
        }

        if (filter.getSpecieId() != 0) {
            if (petDetails.getBreedDetails().getSpecie().getId() != filter.getSpecieId()) return false;
            if (filter.getBreedId() != 0 && petDetails.getBreedDetails().getId() != filter.getBreedId()) return false;
        }
        return true;
    }
}
