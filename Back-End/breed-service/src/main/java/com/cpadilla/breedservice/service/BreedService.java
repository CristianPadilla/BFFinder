package com.cpadilla.breedservice.service;

import com.cpadilla.breedservice.model.BreedResponse;

public interface BreedService {

    BreedResponse getBreedById(int breedId);

//    int createBreed(BreedRequest breedRequest);


    void updateSpecie(BreedResponse breedResponse);

    int disableSpecie(int breedId);


}
