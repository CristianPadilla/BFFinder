package com.cpadilla.adoptionpostservice.external.client;

import com.cpadilla.adoptionpostservice.model.PetRequest;
import com.cpadilla.adoptionpostservice.model.PetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@FeignClient(name = "PET-SERVICE/pet")
public interface PetService {

    @GetMapping("/{id}")
    ResponseEntity<PetResponse> getById(@PathVariable("id") int petId);

    @PostMapping("/save")
    ResponseEntity<Integer> savePet(@RequestBody PetRequest pet);

    @PutMapping("/update")
    ResponseEntity<Integer> updatePet(@RequestBody PetRequest pet);

    @GetMapping("/owner/{id}")
    ResponseEntity<List<PetResponse>> getAllByOwnerId(@PathVariable("id") int ownerId);
}
