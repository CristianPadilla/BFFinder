package com.cpadilla.petservice.external.client;

import com.cpadilla.petservice.model.ImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "IMAGE-SERVICE/image")
//@Service
public interface ImageService {

    @PostMapping(value = "/pet/profile/{petId}/{previousImageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ImageResponse> updatePetProfileImage(@PathVariable("petId") long petId, @RequestBody MultipartFile image, @PathVariable("previousImageId") int previousImageId);

    @GetMapping("/{imageId}")
    ResponseEntity<ImageResponse> getImageById(@PathVariable("imageId") int imageId);


}
