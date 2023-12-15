package com.cpadilla.petservice.controller;

import com.cpadilla.petservice.model.PetsFilterRequest;
import com.cpadilla.petservice.model.PetRequest;
import com.cpadilla.petservice.model.PetResponse;
import com.cpadilla.petservice.service.PetService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
@Log4j2
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> getById(@PathVariable("id") int petId) {
        return new ResponseEntity<>(service.getPetById(petId), HttpStatus.OK);
    }

    @PostMapping("/user/{userId}/filter")
    public ResponseEntity<Page<PetResponse>> getByUserFilter(@PathVariable("userId") int userId, @RequestBody PetsFilterRequest filtersRequest) {
        return new ResponseEntity<>(service.getByUserFilter(userId, filtersRequest), HttpStatus.OK);
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<PetResponse>> getAllByOwnerId(@PathVariable("id") int ownerId) {
        log.info("Getting all pets by owner id {} from CONTROLLER layer", ownerId);
        return new ResponseEntity<>(service.getAllByOwnerId(ownerId), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> savePet(@Valid @RequestBody PetRequest pet) {
        return new ResponseEntity<>(service.savePet(pet), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Integer> updatePet(@RequestBody PetRequest pet) {
        return new ResponseEntity<>(service.updatePet(pet), HttpStatus.OK);
    }


}
