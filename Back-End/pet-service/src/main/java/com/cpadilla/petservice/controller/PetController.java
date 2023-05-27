package com.cpadilla.petservice.controller;

import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;
import com.cpadilla.petservice.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> getById(@PathVariable("id") int petId) {
        return new ResponseEntity<>(service.getPetById(petId), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> savePet(@RequestBody PetRequest pet) {
        return new ResponseEntity<>(service.savePet(pet), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Integer> updatePet(@RequestBody PetRequest pet) {
        return new ResponseEntity<>(service.updatePet(pet), HttpStatus.OK);
    }


}
