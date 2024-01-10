package com.cpadilla.specieservice.service;

import com.cpadilla.specieservice.exception.CustomException;
import com.cpadilla.specieservice.model.SpecieRequest;
import com.cpadilla.specieservice.model.SpecieResponse;
import com.cpadilla.specieservice.repository.SpecieRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class SpecieServiceImpl implements SpecieService {


    @Autowired
    private SpecieRepository repository;


    @Override
    public int createSpecie(SpecieRequest specieRequest) {
        return 0;// still not implemented
    }

    @Override
    public SpecieResponse getSpecieById(int specieId) {
        log.info("Getting specie info with id: {} from SERVICE layer", specieId);
        var specieEntity = repository.findById(specieId)
                .orElseThrow(() -> new CustomException("specie not found with id: " + specieId, "S"));

        return SpecieResponse.builder()
                .id(specieEntity.getId())
                .name(specieEntity.getName())
                .description(specieEntity.getDescription())
                .build();
    }

    @Override
    public List<SpecieResponse> getSpecies() {
        log.info("Getting list of species from SERVICE layer");
        var specieEntities = repository.findAll();

        return specieEntities.stream().map(specieEntity ->
                SpecieResponse.builder()
                        .id(specieEntity.getId())
                        .name(specieEntity.getName())
                        .description(specieEntity.getDescription())
                        .build()).collect(Collectors.toList());


    }

    @Override
    public void updateSpecie(SpecieResponse specieResponse) {
        // still not implemented
    }

    @Override
    public int disableSpecie(int specieId) {
        return 0;// still not implemented
    }
}
