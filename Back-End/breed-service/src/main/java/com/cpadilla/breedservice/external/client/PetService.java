package com.cpadilla.breedservice.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "PET-SERVICE/pet")
public interface PetService {

    @GetMapping("/shelter/{shelterId}/breeds")
    ResponseEntity<List<Integer>> findAvailableShelterBreeds(@PathVariable("shelterId") int shelterId);
}
