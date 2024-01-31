package com.cpadilla.authservice.controller;

import com.cpadilla.authservice.model.*;
import com.cpadilla.authservice.service.AuthenticationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Log4j2
public class AuthController {


    @Autowired
    private AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        log.info("saving user from auth service CONTROLLER");
//        service.register(userRegisterRequest);
        return new ResponseEntity<>(service.register(userRegisterRequest), HttpStatus.CREATED);
    }

    @PostMapping("/register/shelter")
    public ResponseEntity<AuthenticationResponse> registerShelter(@RequestBody ShelterRegisterRequest userRegisterRequest) {
        log.info("saving shelter user from auth service CONTROLLER");
//        service.registerShelter(userRegisterRequest);
        return new ResponseEntity<>(service.registerShelter(userRegisterRequest), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> getToken(@RequestBody AuthenticationRequest authenticationRequest) {
        log.info("authenticate from auth service CONTROLLER");
        return ResponseEntity.ok(service.authenticate(authenticationRequest));

    }


    @GetMapping("/validate")
    public ResponseEntity<AuthenticationResponse> validateToken(@RequestHeader("Authorization") String token) {
        return ResponseEntity.status(HttpStatus.OK).body(service.validateToken(token));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody AdminRegisterRequest admin) {
        log.info("saving  admin user from auth service CONTROLLER");
        return new ResponseEntity<>(service.registerAdmin(admin), HttpStatus.CREATED);
    }

    @PostMapping("/saludo")
    public ResponseEntity<Void> registerAdmin() {
        log.info("HOLA MUNDOOOOOOOOOOOOO");
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
