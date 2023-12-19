package com.cpadilla.petservice.service;

import com.cpadilla.petservice.model.PetsFilterRequest;
import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {

    PetResponse getPetById(int petId);

    Page<PetResponse> getByUserFilter(int userId, PetsFilterRequest filters);

    PetResponse savePet(PetRequest petRequest);

    int updatePet(PetRequest petRequest);

    void disablePet(int petId);

    List<PetResponse> getAllByOwnerId(int ownerId);

    PetResponse updateProfileImage(int petId, MultipartFile image);

}
