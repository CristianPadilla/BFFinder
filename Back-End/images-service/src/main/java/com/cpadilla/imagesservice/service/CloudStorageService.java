package com.cpadilla.imagesservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudStorageService {

    String uploadProfileImage(String blobName, MultipartFile image);
    String uploadPetProfileImage(String blobName, MultipartFile image);
    String uploadPostImage(String blobName, MultipartFile image);
}
