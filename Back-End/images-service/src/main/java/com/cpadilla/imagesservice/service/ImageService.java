package com.cpadilla.imagesservice.service;


import com.cpadilla.imagesservice.model.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    ImageResponse updateProfileImage(long userId, MultipartFile imag, int previousImageId);
    ImageResponse updatePetProfileImage(long petId, MultipartFile imag, int previousImageId);

    ImageResponse uploadPostImage(int postId, MultipartFile image);

    void deleteImage(int imageId);

    ImageResponse getImageById(int imageId);

}
