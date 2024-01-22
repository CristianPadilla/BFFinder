package com.cpadilla.specieservice.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "ADOPTION-POST-SERVICE/post")
public interface AdoptionPostService {


    @GetMapping("/available/species")
    ResponseEntity<List<Integer>> findAvailablePostedSpecies();
}
