package com.cpadilla.imagesservice.service;

import com.cpadilla.imagesservice.entity.ImageEntity;
import com.cpadilla.imagesservice.exception.ImageServiceCustomException;
import com.cpadilla.imagesservice.model.ImageResponse;
import com.cpadilla.imagesservice.repository.ImageRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.Instant;

@Service
@Log4j2
public class ImageServiceImpl implements ImageService {

    @Autowired
    private CloudStorageService storageService;


    @Autowired
    private ImageRepository repository;



    @Override
    public ImageResponse updateProfileImage(long userId, MultipartFile image, int previousImageId) {
        log.info("updating profile image for user id {} from image service ", userId);
        var imageName = generateImageName(userId);
        var blobname = "/" + userId + "/" + imageName; // image name must include user id folder
        var createdBlobName = storageService.uploadProfileImage(blobname, image);

        var imageEntity = ImageEntity.builder()
                .name(createdBlobName)
                .status(true)
                .uploadDate(Instant.now())
                .build();
        var savedImage = repository.save(imageEntity);

        if (previousImageId > 0) {// disable previous image
            var previousImage = repository.findById(previousImageId).orElseThrow(() -> new ImageServiceCustomException("previous image not found for id " + previousImageId, "IMAGE_NOT_FOUND"));
            previousImage.setStatus(false);
            repository.save(previousImage);
        }

        return ImageResponse.builder()
                .imageId(savedImage.getId())
                .imageUrl(savedImage.getName())
//                .uploadDate(savedImage.getUploadDate())
                .build();
    }

    @Override
    public ImageResponse uploadPostImage(int postId, MultipartFile image) {
        log.info("uploading post image for post id {} from service layer", postId);
        var imageName = generateImageName(postId);
        var blobname = "/" + postId + "/" + imageName; // image name must include user id folder
        var createdBlobName = storageService.uploadPostImage(blobname, image);

        var imageEntity = ImageEntity.builder()
                .name(createdBlobName)
                .status(true)
                .uploadDate(Instant.now())
                .build();
        var savedImage = repository.save(imageEntity);

        return ImageResponse.builder()
                .imageId(savedImage.getId())
                .imageUrl(savedImage.getName())
//                .uploadDate(savedImage.getUploadDate())
                .build();
    }

    @Override
    public void deleteImage(int imageId) {
        log.info("disabling image with id: {} from service layer", imageId);
        var image = repository.findByIdAndStatusTrue(imageId)
                .orElseThrow(() -> new ImageServiceCustomException("image not found for id " + imageId, "IMAGE_NOT_FOUND"));
        image.setStatus(false);
        repository.save(image);
    }

    @Override
    public ImageResponse getImageById(int imageId) {
        var imageEntity = repository.findByIdAndStatusTrue(imageId)
                .orElseThrow(() -> new ImageServiceCustomException("image for id " + imageId + " not found", "IMAGE_NOT_FOUND"));

        return ImageResponse.builder()
                .imageId(imageEntity.getId())
                .imageUrl(imageEntity.getName())
                .build();
    }


    private String generateImageName(long identifier) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");// include milliseconds
        String timestamp = dateFormat.format(Date.from(Instant.now()));
        return identifier + "_" + timestamp + ".png";
    }
}
