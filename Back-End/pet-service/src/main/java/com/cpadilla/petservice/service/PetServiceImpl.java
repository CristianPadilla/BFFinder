package com.cpadilla.petservice.service;


import com.cpadilla.petservice.entity.PetEntity;
import com.cpadilla.petservice.exception.CustomException;
import com.cpadilla.petservice.exception.UnsupportedFileException;
import com.cpadilla.petservice.external.client.AdoptionPostService;
import com.cpadilla.petservice.external.client.BreedService;
import com.cpadilla.petservice.external.client.ImageService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
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
    private ImageService imageService;

    @Autowired
    private AdoptionPostService adoptionPostService;

    @Autowired
    private PetFilterSpecification<PetEntity> filterSpecification;

    public static final List<String> allowedImageFormats = Arrays.asList("jpg", "png", "jpeg");

    @Override
    public PetResponse getPetById(int petId) {
        log.info("Getting pet by id {} at SERVICE layer", petId);
        var petEntity = repository.findByIdAndStatusTrue(petId)
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petId, "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        return buildPetFromPetEntity(petEntity);
    }

    @Override
    public PetsFilteredPageResponse getByUserFilter(int userId, PetsFilterRequest filters) {
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
                .vaccinated(filters.getVaccinated())
                .sterilized(filters.getSterilized())
                .dewormed(filters.getDewormed())
                .build();

        var specification =
                filterSpecification.getSearchSpecification(petsFilters);

        var sortingField = validateSorting(filters.getSort());
        var sortingDetails = filters.isDesc()
                ? Sort.by(Sort.Order.desc(sortingField))
                : Sort.by(Sort.Order.by(sortingField));
        log.info("filtroooo", filters.getPosted());

        var page = new PageImpl<>(new ArrayList<PetResponse>(), PageRequest.of(filters.getPage(), pagesize, sortingDetails), 0);
        if (filters.getPosted() != null) {
            var petEntities = repository.findAll(specification);
//            log.info("responsePets00: {} con pagesize {}", petEntities, pagesize);
            var responsePets = petEntities.stream()
                    .map(this::buildPetFromPetEntity)
                    .collect(Collectors.toList());

            responsePets = responsePets.stream()
                    .filter(petResponse -> adoptionPostService.checkPetIsPosted(petResponse.getId()).getBody() == filters.getPosted())
                    .collect(Collectors.toList());
            log.info("responsePets22: {}", responsePets);

            int fromElement = filters.getPage() * pagesize;
            int intoElements = Math.min(fromElement + pagesize, responsePets.size());
            var pageElements = responsePets.subList(fromElement, intoElements);

            page = new PageImpl<>(pageElements, PageRequest.of(filters.getPage(), pagesize, sortingDetails), responsePets.size());
        } else {
            var petEntities = repository.findAll(specification, PageRequest.of(filters.getPage(), pagesize, sortingDetails));
            var responsePets = petEntities.stream()
                    .map(this::buildPetFromPetEntity)
                    .collect(Collectors.toList());
            page = new PageImpl<>(responsePets, petEntities.getPageable(), petEntities.getTotalElements());
        }


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
        return PetsFilteredPageResponse.builder()
                .page(page)
                .filters(filters)
                .build();
    }

    @Override
    public PetResponse savePet(PetRequest petRequest) {
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
        return buildPetFromPetEntity(repository.save(petToSave));
    }

    @Override
    public PetResponse updatePet(PetRequest petRequest) {
        log.info("updating pet with id {} at SERVICE layer", petRequest.getId());

        var petToUpdate = repository.findByIdAndStatusTrue(petRequest.getId())
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petRequest.getId(), "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        petToUpdate.setName(petRequest.getName());
        petToUpdate.setWeight(petRequest.getWeight());
        petToUpdate.setAge(petRequest.getAge());
        petToUpdate.setVaccinated(petRequest.isVaccinated());
        petToUpdate.setDangerous(petRequest.isDangerous());
        petToUpdate.setSize(petRequest.getSize().charAt(0));
        petToUpdate.setSterilized(petRequest.isSterilized());
        petToUpdate.setDewormed(petRequest.isDewormed());

        if (petRequest.getBreedId() > 0) {
            var newBreed = breedService.getBreedById(petRequest.getBreedId()).getBody();
            if (newBreed == null)
                throw new CustomException("Breed not found with id: " + petRequest.getBreedId(), "BREED_NOT_FOUND", HttpStatus.BAD_REQUEST.value());

            petToUpdate.setBreedId(newBreed.getId());
        }

        return buildPetFromPetEntity(repository.save(petToUpdate));
    }


    @Override
    public void disablePet(int petId) {
        log.info("disabling pet with id {} at SERVICE layer", petId);
        var petToDisable = repository.findByIdAndStatusTrue(petId)
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petId, "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));
        petToDisable.setStatus(false);
        repository.save(petToDisable);
    }


    @Override
    public PetResponse updateProfileImage(int petId, MultipartFile image) {// if want to delete, just do not send an image
        log.info("updating profile photo for pet with id: {} from service layer", petId);


        var petEntity = repository.findByIdAndStatusTrue(petId)
                .orElseThrow(() -> new CustomException("Pet not found with id: " + petId, "PET_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        ImageResponse newImage;
        if (image == null || image.isEmpty()) {
            petEntity.setImageId(null);
        } else {
            var filename = image.getOriginalFilename();
            var extension = filename.substring(filename.lastIndexOf(".") + 1);
            if (!allowedImageFormats.contains(extension)) {
                throw new UnsupportedFileException("The file type/extension is invalid, try a valid image file (png, jpg, jpeg)");
            }


            newImage =
                    imageService.updatePetProfileImage(
                            petId,
                            image,
                            petEntity.getImageId() != null && petEntity.getImageId() > 0 ? petEntity.getImageId() : 0
                    ).getBody();
            petEntity.setImageId(newImage.getImageId());
        }
        var updatedPet = repository.save(petEntity);

        return buildPetFromPetEntity(updatedPet);

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
                                        .dewormed(petEntity.getDewormed())
//                                .breedDetails(pe)// still not implemented
                                        .build()
                ).collect(Collectors.toList());
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


    public PetResponse buildPetFromPetEntity(PetEntity petEntity) {
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

        var profileImageUrl =
                petEntity.getImageId() != null
                        ? imageService.getImageById(petEntity.getImageId()).getBody().getImageUrl()
                        : null;

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
                .profileImageUrl(profileImageUrl)
                .isPublished(isPublished)
                .build();
    }

}
