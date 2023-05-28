package com.cpadilla.specieservice.service;


import com.cpadilla.specieservice.model.SpecieRequest;
import com.cpadilla.specieservice.model.SpecieResponse;

public interface SpecieService {

    int createSpecie(SpecieRequest specieRequest);

    SpecieResponse getSpecieById(int specieId);

    void updateSpecie(SpecieResponse specieResponse);

    int disableSpecie(int specieId);

}
