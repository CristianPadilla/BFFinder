package com.cpadilla.breedservice.controller;

import com.cpadilla.breedservice.external.client.SpecieService;
import com.cpadilla.breedservice.model.BreedResponse;
import com.cpadilla.breedservice.service.BreedService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/breed")
public class BreedController {

    @Autowired
    private BreedService service;

    @GetMapping("/{id}")
    public ResponseEntity<BreedResponse> getBreedById(@PathVariable(name = "id") int breedId) {
        log.info("Getting breed info with id: {} from CONTROLLER layer", breedId);
        return new ResponseEntity<>(service.getBreedById(breedId), HttpStatus.OK);
    }
}
