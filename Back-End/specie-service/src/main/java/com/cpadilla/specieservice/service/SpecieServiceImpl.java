package com.cpadilla.specieservice.service;

import com.cpadilla.specieservice.exception.CustomException;
import com.cpadilla.specieservice.external.client.AdoptionPostService;
import com.cpadilla.specieservice.external.client.PetService;
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

    @Autowired
    private AdoptionPostService adoptionPostService;

    @Autowired
    private PetService petService;


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
    public List<SpecieResponse> getAvailablePostedSpecies() {// species that have at least one posted pet
        log.info("Getting list of available posted species from SERVICE layer");
        var specieEntities = repository.findAll();

        var availableSpecies = adoptionPostService.findAvailablePostedSpecies().getBody();

        return specieEntities.stream().map(specieEntity ->
                        SpecieResponse.builder()
                                .id(specieEntity.getId())
                                .name(specieEntity.getName())
                                .description(specieEntity.getDescription())
                                .build())
                .filter(specieResponse -> availableSpecies.contains(specieResponse.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<SpecieResponse> getAvailableShelterSpecies(int shelterId) {

        log.info("Getting list of available species for shelter with id: {} from SERVICE layer", shelterId);
        var specieEntities = repository.findAll();

        var availableSpecies = petService.findAvailableShelterSpecies(shelterId).getBody();

        return specieEntities.stream()
                .filter(specieEntity -> availableSpecies.contains(specieEntity.getId()))
                .map(specieEntity ->
                        SpecieResponse.builder()
                                .id(specieEntity.getId())
                                .name(specieEntity.getName())
                                .description(specieEntity.getDescription())
                                .build())
                .collect(Collectors.toList());
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
