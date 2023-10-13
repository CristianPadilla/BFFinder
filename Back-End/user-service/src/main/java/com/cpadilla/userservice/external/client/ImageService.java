package com.cpadilla.userservice.external.client;

import com.cpadilla.userservice.model.ImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "IMAGE-SERVICE/image")
//@Service
public interface ImageService {

    @PostMapping("/save/profile/{userId}/{previousImageId}")
    ResponseEntity<ImageResponse> updateProfileImage(@PathVariable("userId") long userId, @RequestBody MultipartFile image,@PathVariable("previousImageId")  int previousImageId);
}
