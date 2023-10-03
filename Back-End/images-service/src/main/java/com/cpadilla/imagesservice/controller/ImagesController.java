package com.cpadilla.imagesservice.controller;

import com.cpadilla.imagesservice.service.ImageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@Log4j2
public class ImagesController {

    @Autowired
    private ImageService service;

    @PostMapping("/save/profile/{userId}")
    public ResponseEntity<String> updateProfileImage(@PathVariable("userId") String userId, @RequestBody MultipartFile image) {
        log.info("saving profile image for user with id: {}", userId);
        return ResponseEntity.ok(service.updateProfileImage(userId, image));
    }


}
