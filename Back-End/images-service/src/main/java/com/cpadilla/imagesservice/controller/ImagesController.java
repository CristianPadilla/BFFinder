package com.cpadilla.imagesservice.controller;

import com.cpadilla.imagesservice.model.ImageResponse;
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

    @PostMapping("/profile/{userId}/{previousImageId}")
    public ResponseEntity<ImageResponse> updateProfileImage(@PathVariable("userId") long userId, @RequestBody MultipartFile image, @PathVariable("previousImageId") int previousImageId) {
        log.info("updating profile image for user with id: {} from controller layer", userId);
        return ResponseEntity.ok(service.updateProfileImage(userId, image, previousImageId));
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<ImageResponse> uploadPostImage(@PathVariable("postId") int postId, @RequestBody MultipartFile image) {
        log.info("uploading post image for post id: {} from controller layer", postId);
        return ResponseEntity.ok(service.uploadPostImage(postId, image));
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<ImageResponse> getImageById(@PathVariable("imageId") int imageId) {
        log.info("getting image with id: {} from controller layer", imageId);
        return ResponseEntity.ok(service.getImageById(imageId));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> deleteImageById(@PathVariable("imageId") int imageId) {
        log.info("disabling image with id: {} from controller layer", imageId);
        service.deleteImage(imageId);
        return ResponseEntity.noContent().build();
    }


}
