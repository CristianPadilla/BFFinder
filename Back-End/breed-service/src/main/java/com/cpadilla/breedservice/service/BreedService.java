package com.cpadilla.breedservice.service;

import com.cpadilla.breedservice.model.BreedResponse;

import java.util.List;

public interface BreedService {

    BreedResponse getBreedById(int breedId);
    List<BreedResponse> getAllBreedsBySpecieId(int specieId);

//    int createBreed(BreedRequest breedRequest);


    void updateSpecie(BreedResponse breedResponse);

    int disableSpecie(int breedId);


}
