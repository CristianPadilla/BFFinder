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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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
    public Page<PetResponse> getByUserFilter(int userId, PetsFilterRequest filters) {
        log.info("Getting pets by filters {} at SERVICE layer", filters);
        var pagesize = filters.getPageSize() > 0 && filters.getPageSize() <= 20 ? filters.getPageSize() : 10;

        var petsFilters = PetsFilters.builder()
                .search(filters.getSearch())
                .ownerId(userId)
                .specieId(filters.getSpecieId())
                .breedId(filters.getBreedId())
                .size(filters.getSize())
                .age(filters.getAge())
                .status("A")
                .build();

        var specification =
                filterSpecification.getSearchSpecification(petsFilters);

        var sortingField = validateSorting(filters.getSort());
        var sortingDetails = filters.isDesc()
                ? Sort.by(Sort.Order.desc(sortingField))
                : Sort.by(Sort.Order.by(sortingField));

        var petEntities = repository.findAll(specification, PageRequest.of(filters.getPage(), pagesize, sortingDetails));

        var filteredPets = petEntities.stream()
                .map(petEntity -> {
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
                }).collect(Collectors.toList());

//        var sortingDetails = Sort.by(Sort.Order.by("name"));
//        if (filters.getSort() != null && !filters.getSort().isEmpty()) {
//            var sortingField = validateSorting(filters.getSort());
//            var comparator = switch (sortingField) {
//                case "name" -> Comparator.comparing(PetResponse::getName);
//                case "age" -> Comparator.comparing(PetResponse::getAge);
//                default -> Comparator.comparing(PetResponse::getAge);
//            };
//
//
//            filteredPets.sort(comparator);
//            sortingDetails = filters.isDesc()
//                    ? Sort.by(Sort.Order.desc(sortingField))
//                    : Sort.by(Sort.Order.by(sortingField));
//        } else filteredPets.sort(Comparator.comparing(PetResponse::getAge));

        return new PageImpl<>(filteredPets, PageRequest.of(filters.getPage(), pagesize, Sort.by(Sort.Order.by("name"))), filteredPets.size());
    }

    @Override
    public int savePet(PetRequest petRequest) {
        log.info("saving pet at SERVICE layer");
        var owner = ownerService.getUserById(petRequest.getOwnerId()).getBody();
        if (owner == null)
            throw new CustomException("No exist user with id: " + petRequest.getOwnerId(), "USER_NOT_FOUND", HttpStatus.NOT_FOUND.value());
        var breed = breedService.getBreedById(petRequest.getBreedId());
        if (breed == null)
            throw new CustomException("No breed exist with id: " + petRequest.getBreedId(), "BREED_NOT_FOUND", HttpStatus.NOT_FOUND.value());

        var petToSave = PetEntity.builder()
                .name(petRequest.getName())
                .weight(petRequest.getWeight())
                .age(petRequest.getAge())
                .vaccinated(petRequest.isVaccinated())
                .dangerous(petRequest.isDangerous())
                .size(petRequest.getSize().charAt(0))
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
        petToUpdate.setSize(petRequest.getSize().charAt(0));
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

    public String validateSorting(String sortRequest) {
        var sort = "name";
        if (sortRequest != null && !sortRequest.isEmpty()) {
            sort = switch (sortRequest) {
                case "name", "age" -> sortRequest;
                default ->
                        throw new CustomException("Sorting criteria is not valid", "SORTING_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            };
        }
        return sort;
    }

    public boolean petPassesFilters(PetResponse petResponse, PetsFilterRequest filter) {

        if (filter.getSize() != null && !filter.getSize().isEmpty()) {
            var sizeFilter = filter.getSize().toLowerCase();
            if (sizeFilter.equals("l") || sizeFilter.equals("s") || sizeFilter.equals("m")) {
                if (sizeFilter.charAt(0) != petResponse.getSize()) return false;
            } else
                throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.NOT_FOUND.value());
        }

        if (filter.getSpecieId() > 0) {
            if (petResponse.getBreedDetails().getSpecie().getId() != filter.getSpecieId()) return false;
            if (filter.getBreedId() != 0 && petResponse.getBreedDetails().getId() != filter.getBreedId()) return false;
        }
        return true;
    }
}
