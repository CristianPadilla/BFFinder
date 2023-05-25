package com.cpadilla.breedservice.external.client;

import com.cpadilla.breedservice.model.SpecieDetails;
import com.cpadilla.breedservice.model.SpecieResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SPECIE-SERVICE/specie")
public interface SpecieService {

    @GetMapping("/{id}")
    ResponseEntity<SpecieResponse> getSpecieById(@PathVariable(name = "id") int specieId);
}
