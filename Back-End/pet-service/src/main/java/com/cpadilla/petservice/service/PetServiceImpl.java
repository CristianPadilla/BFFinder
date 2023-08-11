package com.cpadilla.petservice.service;


import com.cpadilla.petservice.entity.PetEntity;
import com.cpadilla.petservice.exception.CustomException;
import com.cpadilla.petservice.external.client.AdoptionPostService;
import com.cpadilla.petservice.external.client.BreedService;
import com.cpadilla.petservice.external.client.OwnerService;
import com.cpadilla.petservice.model.*;
import com.cpadilla.petservice.repository.PetRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class PetServiceImpl implements PetService {


    @Autowired
    private PetRepository repository;

    @Autowired
    private BreedService breedService;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private AdoptionPostService adoptionPostService;

    @Autowired
    private PetFilterSpecification<PetEntity> filterSpecification;


    @Override
    public PetResponse getPetById(int petId) {
        log.info("Getting pet by id {} at SERVICE layer", petId);
        var petEntity = repository.findById(petId)
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petId, "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var owner = ownerService.getUserById(petEntity.getOwnerId()).getBody();
        var ownerDetails = OwnerDetails.builder()
                .userId(owner.getUserId())
                .name(owner.getName())
                .surname(owner.getSurname())
                .phoneNumber(owner.getPhoneNumber())
                .build();

        var breed = breedService.getBreedById(petEntity.getBreedId()).getBody();
        var breedDetails = BreedDetails.builder()
                .id(breed.getId())
                .name(breed.getName())
                .specie(breed.getSpecie())
                .build();

        boolean isPublished =
                adoptionPostService.checkPetIsPosted(petEntity.getId()).getBody() != null
                        ? adoptionPostService.checkPetIsPosted(petEntity.getId()).getBody()
                        : false;

        return PetResponse.builder()
                .id(petEntity.getId())
                .name(petEntity.getName())
                .weight(petEntity.getWeight())
                .age(petEntity.getAge())
                .vaccinated(petEntity.getVaccinated())
                .dangerous(petEntity.getDangerous())
                .size(petEntity.getSize())
                .sterilized(petEntity.getSterilized() != null ? petEntity.getSterilized() : false)
                .dewormed(petEntity.getDewormed() != null ? petEntity.getDewormed() : false)
                .ownerDetails(ownerDetails)
                .breedDetails(breedDetails)
                .isPublished(isPublished)
                .build();
    }

    @Override
    public List<PetResponse> getAllFilter(FilterRequest filters) { // method not completed
        log.info("Getting pets by filters {} at SERVICE layer", filters);

        var specification =
                filterSpecification.getSearchSpecification(filters);

        var petEntity = repository.findAll(specification);

        var owner = ownerService.getUserById(petEntity.getOwnerId()).getBody();
        var ownerDetails = OwnerDetails.builder()
                .userId(owner.getUserId())
                .name(owner.getName())
                .surname(owner.getSurname())
                .phoneNumber(owner.getPhoneNumber())
                .build();

        var breed = breedService.getBreedById(petEntity.getBreedId()).getBody();
        var breedDetails = BreedDetails.builder()
                .id(breed.getId())
                .name(breed.getName())
                .specie(breed.getSpecie())
                .build();

        return PetResponse.builder()
                .id(petEntity.getId())
                .name(petEntity.getName())
                .weight(petEntity.getWeight())
                .age(petEntity.getAge())
                .vaccinated(petEntity.getVaccinated())
                .dangerous(petEntity.getDangerous())
                .size(petEntity.getSize())
                .sterilized(petEntity.getSterilized() != null ? petEntity.getSterilized() : false)
                .dewormed(petEntity.getDewormed() != null ? petEntity.getDewormed() : false)
                .ownerDetails(ownerDetails)
                .breedDetails(breedDetails)
                .build();
//        return null;
    }

    @Override
    public int savePet(PetRequest petRequest) {
        log.info("saving pet at SERVICE layer");
        var petToSave = PetEntity.builder()
                .id(petRequest.getId())
                .name(petRequest.getName())
                .weight(petRequest.getWeight())
                .age(petRequest.getAge())
                .vaccinated(petRequest.isVaccinated())
                .dangerous(petRequest.isDangerous())
                .size(petRequest.getSize())
                .sterilized(petRequest.isSterilized())
                .dewormed(petRequest.isDewormed())
                .status(true)
                .breedId(petRequest.getBreedId())
                .ownerId(petRequest.getOwnerId())
                .build();
        return repository.save(petToSave).getId();
    }

    @Override
    public int updatePet(PetRequest petRequest) {
        log.info("updating pet with id {} at SERVICE layer", petRequest.getId());

        var petToUpdate = repository.findById(petRequest.getId())
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petRequest.getId(), "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        petToUpdate.setName(petRequest.getName());
        petToUpdate.setWeight(petRequest.getWeight());
        petToUpdate.setAge(petRequest.getAge());
        petToUpdate.setVaccinated(petRequest.isVaccinated());
        petToUpdate.setDangerous(petRequest.isDangerous());
        petToUpdate.setSize(petRequest.getSize());
        petToUpdate.setSterilized(petRequest.isSterilized());
        petToUpdate.setDewormed(petRequest.isDewormed());

        return repository.save(petToUpdate).getId();
    }


    @Override
    public void disablePet(int petId) {

    }

    @Override
    public List<PetResponse> getAllByOwnerId(int ownerId) {
        return repository.findAllByOwnerId(ownerId)
                .stream()
                .map(petEntity ->
                                PetResponse.builder()
                                        .id(petEntity.getId())
                                        .name(petEntity.getName())
                                        .weight(petEntity.getWeight())
                                        .age(petEntity.getAge())
                                        .vaccinated(petEntity.getVaccinated())
                                        .dangerous(petEntity.getDangerous())
                                        .size(petEntity.getSize())
                                        .sterilized(petEntity.getSterilized())
                                        .status(petEntity.getStatus())
                                        .dewormed(petEntity.getDewormed())
//                                .breedDetails(pe)// still not implemented
                                        .build()
                ).collect(Collectors.toList());
    }
}
