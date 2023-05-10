package com.cpadilla.authservice.controller;

import com.cpadilla.authservice.model.RegisterRequest;
import com.cpadilla.authservice.model.UserCredentialsResponse;
import com.cpadilla.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest user){
        return service.register(user);
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody UserCredentialsResponse user){
        return service.gene(user);
    }


    @PostMapping("/validateToken")
    public String authenticate(@RequestBody RegisterRequest user){
        return service.register(user);
    }





}
