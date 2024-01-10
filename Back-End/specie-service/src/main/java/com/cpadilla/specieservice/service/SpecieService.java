package com.cpadilla.specieservice.service;


import com.cpadilla.specieservice.model.SpecieRequest;
import com.cpadilla.specieservice.model.SpecieResponse;

import java.util.List;

public interface SpecieService {

    int createSpecie(SpecieRequest specieRequest);

    SpecieResponse getSpecieById(int specieId);
    List<SpecieResponse> getSpecies();

    void updateSpecie(SpecieResponse specieResponse);

    int disableSpecie(int specieId);

}
