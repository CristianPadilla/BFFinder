package com.cpadilla.specieservice.controller;

import com.cpadilla.specieservice.model.SpecieResponse;
import com.cpadilla.specieservice.service.SpecieService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/specie")
@Log4j2
public class SpecieController {

    @Autowired
    private SpecieService service;


    @GetMapping("/{id}")
    ResponseEntity<SpecieResponse> getSpecieById(@PathVariable(name = "id") int specieId) {
        log.info("Getting specie info with id: {} from CONTROLLER layer", specieId);
        var specie = service.getSpecieById(specieId);
        return new ResponseEntity<>(specie, HttpStatus.OK);
    }

}
