package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
import com.cpadilla.adoptionpostservice.exception.NoPostsFoundException;
import com.cpadilla.adoptionpostservice.external.client.PetService;
import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.repository.AdoptionPostRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class AdoptionPostServiceImpl implements AdoptionPostService {

    @Autowired
    private AdoptionPostRepository repository;

    @Autowired
    private PetService petService;


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


        return AdoptionPostResponse.builder()
                .id(postEntity.getId())
                .description(postEntity.getDescription())
                .date(postEntity.getDate())
                .petDetails(petDetails)
                .build();
    }

    @Override
    public int savePost(PostRequest request) {
        var adoptionPostRequest = request.getAdoptionPostRequest();

        adoptionPostRequest.getPetRequest().setOwnerId(request.getUserId());

        int petId = petService.savePet(adoptionPostRequest.getPetRequest()).getBody();

        var postEntity = AdoptionPostEntity.builder()
                .description(adoptionPostRequest.getDescription())
                .status(true)
                .date(Instant.now())
                .petId(petId)
                .build();
        return repository.save(postEntity).getId();
    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId) {

        var postEntities = repository.findAllByUserIdAndStatusIsTrue(userId);


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
        } else throw new NoPostsFoundException("not available posts for user with id " + userId);

    }

    @Override
    public int updatePost(AdoptionPostRequest request) {
        return 0;
    }

    @Override
    public int cancelPost(int postId) {
        return 0;
    }
}
