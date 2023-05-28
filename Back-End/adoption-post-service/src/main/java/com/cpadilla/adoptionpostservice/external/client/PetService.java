package com.cpadilla.adoptionpostservice.external.client;

import com.cpadilla.adoptionpostservice.model.PetDetails;
import com.cpadilla.adoptionpostservice.model.PetRequest;
import com.cpadilla.adoptionpostservice.model.PetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@FeignClient(name = "PET-SERVICE/pet")
public interface PetService {

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> getById(@PathVariable("id") int petId);

    @PostMapping("/save")
    public ResponseEntity<Integer> savePet(@RequestBody PetRequest pet);

    @PutMapping("/update")
    public ResponseEntity<Integer> updatePet(@RequestBody PetRequest pet);

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<PetResponse>> getAllByOwnerId(@PathVariable("id") int ownerId);
}
