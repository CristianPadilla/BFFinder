package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
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
    public int updatePost(PostRequest request) {
        var adoptionPostRequest = request.getAdoptionPostRequest();

        var postEntity = repository.findById(adoptionPostRequest.getId())
                .orElseThrow(() -> new CustomException("Adoption post not found with id: " + adoptionPostRequest.getId(), "ADOPTION_POST_NOT_FOUND", HttpStatus.NOT_FOUND.value()));
        var petToSave = PetRequest.builder()
                .id(postEntity.getPetId())
                .name(adoptionPostRequest.getPetRequest().getName())
                .weight(adoptionPostRequest.getPetRequest().getWeight())
                .age(adoptionPostRequest.getPetRequest().getAge())
                .vaccinated(adoptionPostRequest.getPetRequest().isVaccinated())
                .dangerous(adoptionPostRequest.getPetRequest().isDangerous())
                .size(adoptionPostRequest.getPetRequest().getSize())
                .sterilized(adoptionPostRequest.getPetRequest().isSterilized())
                .dewormed(adoptionPostRequest.getPetRequest().isDewormed())
                .build();
        postEntity.setDescription(adoptionPostRequest.getDescription());

        petService.updatePet(petToSave);
        return repository.save(postEntity).getId();
    }

    @Override
    public List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId) {
        var pets = petService.getAllByOwnerId(userId).getBody();
        if (pets.size() > 0) {
            return pets.stream()
                    .map(petResponse -> {
                        var postEntity = repository.findByPetId(petResponse.getId());
                        var petDetails = PetPartialDetails.builder()
                                .id(petResponse.getId())
                                .name(petResponse.getName())
                                .breedDetails(petResponse.getBreedDetails())
                                .build();
                        return AdoptionPostPartialsResponse.builder()
                                .id(postEntity.getId())
                                .petDetails(petDetails)
                                .build();
                    })
                    .collect(Collectors.toList());
        } else throw new CustomException("not available posts", "POSTS_NOT_FOUND", HttpStatus.NOT_FOUND.value());

    }

    @Override
    public int cancelPost(int postId) {
        return 0;
    }
}
