package com.cpadilla.petservice.service;

import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;

public interface PetService {

    PetResponse getPetById(int petId);

    int savePet(PetRequest petRequest);

    int updatePet(PetRequest petRequest);

    void disablePet (int petId);

}
