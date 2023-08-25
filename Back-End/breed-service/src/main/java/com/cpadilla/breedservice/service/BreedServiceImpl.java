package com.cpadilla.breedservice.service;

import com.cpadilla.breedservice.exception.CustomException;
import com.cpadilla.breedservice.external.client.SpecieService;
import com.cpadilla.breedservice.model.BreedResponse;
import com.cpadilla.breedservice.model.SpecieDetails;
import com.cpadilla.breedservice.model.SpecieResponse;
import com.cpadilla.breedservice.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BreedServiceImpl implements BreedService {


    @Autowired
    private BreedRepository repository;

    @Autowired
    private SpecieService specieService;


    @Override
    public BreedResponse getBreedById(int breedId) {


        var breedEntity = repository.findById(breedId)
                .orElseThrow(() -> new CustomException("breed not with id: " + breedId, "BREED_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var specie = specieService.getSpecieById(breedEntity.getSpecieId()).getBody();
        var specieDetails = SpecieDetails.builder()
                .id(specie.getId())
                .name(specie.getName())
                .description(specie.getDescription())
                .build();


        return BreedResponse.builder()
                .id(breedEntity.getId())
                .name(breedEntity.getName())
                .specie(specieDetails)
                .build();
    }

    @Override
    public List<BreedResponse> getAllBreedsBySpecieId(int specieId) {
        var breeds = repository.findAllBySpecieId(specieId);

        return breeds.stream()
                .map(breed -> {
                    var specie = specieService.getSpecieById(breed.getSpecieId()).getBody();
                    var specieResponse = SpecieDetails.builder()
                            .id(specie.getId())
                            .name(specie.getName())
                            .build();

                    return BreedResponse.builder()
                            .id(breed.getId())
                            .name(breed.getName())
                            .specie(specieResponse)
                            .build();

                }).collect(Collectors.toList());
    }

    @Override
    public void updateSpecie(BreedResponse breedResponse) {
        //not implemented yet
    }

    @Override
    public int disableSpecie(int breedId) {
        return 0;//not implemented yet
    }
}
