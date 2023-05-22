package com.cpadilla.authservice.controller;

import com.cpadilla.authservice.model.AuthenticationRequest;
import com.cpadilla.authservice.model.AuthenticationResponse;
import com.cpadilla.authservice.model.RegisterRequest;
import com.cpadilla.authservice.service.AuthenticationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Log4j2
public class AuthController {


    @Autowired
    private AuthenticationService service;


//    @Autowired
//    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        log.info("/register CONTROLLER");
        return ResponseEntity.ok(service.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> getToken(@RequestBody AuthenticationRequest authenticationRequest) {
        log.info("/authenticate CONTROLLER");
        return ResponseEntity.ok(service.authenticate(authenticationRequest));

    }
//    @PostMapping("/register")
//    public String register(@RequestBody UserCredentialsEntity user) {
//        log.info("/register CONTROLLER");
//        return service.register(user);
//    }

//    @PostMapping("/token")
//    public String getToken(@RequestBody AuthenticationRequest authRequest) {
//        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//        if (authenticate.isAuthenticated()) {
//            return service.generateToken(authRequest.getUsername());
//        } else {
//            throw new RuntimeException("invalid access");
//        }
//    }


//    @GetMapping("/validate")
//    public String validateToken(@RequestParam("token") String token) {
//        service.validateToken(token);
//        return "Token is valid";
//    }


}
