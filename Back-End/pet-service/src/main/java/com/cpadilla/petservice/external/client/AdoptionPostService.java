package com.cpadilla.petservice.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ADOPTION-POST-SERVICE/post")
public interface AdoptionPostService {

    @GetMapping("/check/pet/{petId}")
    ResponseEntity<Boolean> checkPetIsPosted(@PathVariable("petId") int petId);

}
