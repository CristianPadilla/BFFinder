package com.cpadilla.petservice.service;

import com.cpadilla.petservice.model.FilterRequest;
import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;

import java.util.List;

public interface PetService {

    PetResponse getPetById(int petId);
    List<PetResponse> getAllFilter(FilterRequest filters);

    int savePet(PetRequest petRequest);

    int updatePet(PetRequest petRequest);

    void disablePet (int petId);

    List<PetResponse> getAllByOwnerId(int ownerId);

}
