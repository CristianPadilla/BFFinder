package com.cpadilla.adoptionpostservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class AdoptionPostController {


    @GetMapping("/{id}")
    public String getAdoptionPost() {
        return "Hola mundo";
    }

}
