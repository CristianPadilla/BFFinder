package com.cpadilla.userservice.controller;

import com.cpadilla.userservice.model.UserCredentialsResponse;
import com.cpadilla.userservice.model.UserResponse;
import com.cpadilla.userservice.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<UserCredentialsResponse> getUserCredentialsByEmail(@PathVariable("email") String email) {
        log.info("FROM CONTROLLER LAYER: getting user credentials by user email {}", email);
        return new ResponseEntity<>(service.getUserCredentialsByEmail(email), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") int userId) {
        log.info("FROM CONTROLLER LAYER: getting user by user id {}", userId);
        return new ResponseEntity<>(service.getUserById(userId), HttpStatus.OK);

    }

    @PutMapping("/update/photo/{id}")
    public ResponseEntity<UserResponse> updateProfileImage(@PathVariable("id") int userId, @RequestBody MultipartFile image) {
        log.info("updating profile photo for user with id: {} from controller layer", userId);
        return new ResponseEntity<>(service.updateProfileImage(userId, image), HttpStatus.OK);
    }


}
