package com.cpadilla.petservice.external.client;


import com.cpadilla.petservice.model.BreedResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "BREED-SERVICE/breed")
public interface BreedService {

    @GetMapping("/{id}")
    public ResponseEntity<BreedResponse> getBreedById(@PathVariable(name = "id") int breedId);

}
