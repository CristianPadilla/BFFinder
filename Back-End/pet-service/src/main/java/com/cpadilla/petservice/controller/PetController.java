package com.cpadilla.petservice.controller;

import com.cpadilla.petservice.model.PetResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pets")
public class PetController {


    public ResponseEntity<PetResponse> getById(@PathVariable("id") String id){
        return  ResponseEntity.ok(new PetResponse());
    }
}
