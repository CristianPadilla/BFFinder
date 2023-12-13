package com.cpadilla.petservice.service;

import com.cpadilla.petservice.model.PetsFilterRequest;
import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PetService {

    PetResponse getPetById(int petId);

    Page<PetResponse> getByUserFilter(int userId, PetsFilterRequest filters);

    int savePet(PetRequest petRequest);

    int updatePet(PetRequest petRequest);

    void disablePet(int petId);

    List<PetResponse> getAllByOwnerId(int ownerId);

}
