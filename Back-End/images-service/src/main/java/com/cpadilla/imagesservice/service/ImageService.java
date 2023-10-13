package com.cpadilla.imagesservice.service;


import com.cpadilla.imagesservice.model.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    ImageResponse updateProfileImage(long userId, MultipartFile imag, int previousImageId);

}
