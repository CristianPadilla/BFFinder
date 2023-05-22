package com.cpadilla.userservice.controller;

import com.cpadilla.userservice.model.UserCredentialsResponse;
import com.cpadilla.userservice.model.UserResponse;
import com.cpadilla.userservice.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/credentials/{id}")
    public ResponseEntity<UserCredentialsResponse> getUserCredentialsById(@PathVariable("id") int userId) {
        log.info("FROM CONTROLLER LAYER: getting user credentials by user id {}", userId);
        return new ResponseEntity<>(service.getUserCredentialsById(userId), HttpStatus.OK);

    }

    @GetMapping("/credentials/email/{email}")
    public ResponseEntity<UserCredentialsResponse> getUserCredentialsById(@PathVariable("email") String email) {
        log.info("FROM CONTROLLER LAYER: getting user credentials by user email {}", email);
        return new ResponseEntity<>(service.getUserCredentialsByEmail(email), HttpStatus.OK);

    }


}
