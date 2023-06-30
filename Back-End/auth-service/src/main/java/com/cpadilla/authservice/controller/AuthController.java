package com.cpadilla.authservice.controller;

import com.cpadilla.authservice.model.AuthenticationRequest;
import com.cpadilla.authservice.model.AuthenticationResponse;
import com.cpadilla.authservice.model.RegisterRequest;
import com.cpadilla.authservice.service.AuthenticationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Log4j2
public class AuthController {


    @Autowired
    private AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        log.info("saving user from auth service CONTROLLER");
        return ResponseEntity.ok(service.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> getToken(@RequestBody AuthenticationRequest authenticationRequest) {
        log.info("authenticate from auth service CONTROLLER");
        return ResponseEntity.ok(service.authenticate(authenticationRequest));

    }


//    @GetMapping("/validate")
//    public String validateToken(@RequestParam("token") String token) {
//        service.validateToken(token);
//        return "Token is valid";
//    }


}
