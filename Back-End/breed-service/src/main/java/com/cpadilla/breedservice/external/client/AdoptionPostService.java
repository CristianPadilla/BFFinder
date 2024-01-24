package com.cpadilla.breedservice.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "ADOPTION-POST-SERVICE/post")
public interface AdoptionPostService {


    @GetMapping("/available/breeds/specie/{specieId}")
    ResponseEntity<List<Integer>> findAvailablePostedBreedsBySpecieId(@PathVariable("specieId") int specieId);
}
