package com.cpadilla.petservice.service;

import com.cpadilla.petservice.model.PetsFilterRequest;
import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;
import com.cpadilla.petservice.model.PetsFilteredPageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {

    PetResponse getPetById(int petId);

    PetsFilteredPageResponse getByUserFilter(int userId, PetsFilterRequest filters);

    PetResponse savePet(PetRequest petRequest);

    PetResponse updatePet(PetRequest petRequest);

    void disablePet(int petId);

    List<PetResponse> getAllByOwnerId(int ownerId);
    List<PetResponse> getAllForPostingByOwnerId(int ownerId);

    PetResponse updateProfileImage(int petId, MultipartFile image);

    List<Integer> findAvailableShelterSpecies(int shelterId);
    List<Integer> findAvailableShelterBreeds(int shelterId);

}
