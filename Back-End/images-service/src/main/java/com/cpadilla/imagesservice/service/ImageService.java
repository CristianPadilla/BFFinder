package com.cpadilla.imagesservice.service;


import com.cpadilla.imagesservice.model.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    ImageResponse updateProfileImage(long userId, MultipartFile imag, int previousImageId);
    void uploadPostImages(long postId, MultipartFile[] images);

    ImageResponse getImageById(int imageId);
    List<ImageResponse> getImagesByPostId(int postId);

}
