package com.cpadilla.imagesservice.service;


import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String updateProfileImage(String userId, MultipartFile image);

}
