package com.cpadilla.adoptionpostservice.external.client;

import com.cpadilla.adoptionpostservice.model.ImageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@Service
@FeignClient(name = "IMAGE-SERVICE/image")
public interface ImageService {

    @PostMapping(value = "/post/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ImageResponse> uploadPostImage(@PathVariable("postId") int postId, @RequestBody MultipartFile image);

    @GetMapping("/{imageId}")
    public ResponseEntity<ImageResponse> getImageById(@PathVariable("imageId") int imageId);

}
