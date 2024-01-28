package com.cpadilla.imagesservice.service;

import com.cpadilla.imagesservice.entity.ImageEntity;
import com.cpadilla.imagesservice.exception.ImageServiceCustomException;
import com.cpadilla.imagesservice.exception.UnsoportedFileException;
import com.cpadilla.imagesservice.model.ImageResponse;
import com.cpadilla.imagesservice.repository.ImageRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Random;

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

        if (previousImageId > 0) deleteImage(previousImageId);// disable previous image

        return ImageResponse.builder()
                .imageId(savedImage.getId())
                .imageUrl(savedImage.getName())
//                .uploadDate(savedImage.getUploadDate())
                .build();
    }

    @Override
    public ImageResponse updatePetProfileImage(long petId, MultipartFile image, int previousImageId) {
        log.info("updating profile image for pet id {} from image service ", petId);
        var imageName = generateImageName(petId);
        var blobname = "/" + petId + "/" + imageName; // image name must include user id folder
        var createdBlobName = storageService.uploadPetProfileImage(blobname, image);

        var imageEntity = ImageEntity.builder()
                .name(createdBlobName)
                .status(true)
                .uploadDate(Instant.now())
                .build();
        var savedImage = repository.save(imageEntity);

        if (previousImageId > 0) deleteImage(previousImageId);// disable previous image

        return ImageResponse.builder()
                .imageId(savedImage.getId())
                .imageUrl(savedImage.getName())
//                .uploadDate(savedImage.getUploadDate())
                .build();
    }

    @Override
    public ImageResponse uploadPostImage(int postId, MultipartFile image) {
        log.info("uploading post image for post id {} from service layer", postId);

//        var filename = image.getOriginalFilename();
//        var extension = filename.substring(filename.lastIndexOf(".") + 1);
//        log.info("extensionnn = {}", extension);
//
//        if (!extension.equals("jpg") && !extension.equals("png")) {
////            var result = new BeanPropertyBindingResult(image, "image");
////            result.rejectValue("image", "wrong.filetype", "The file type/extension is invalid, try a valid image file (png, jpg)");
//
//                throw new UnsoportedFileException("The file type/extension is invalid, try a valid image file (png, jpg)");
//
//        }

        var imageName = generateImageName(postId);
        var blobname = "/" + postId + "/" + imageName; // image name must include user id folder
//        log.info("NOMBRE IMAGEN {} ", image.getOriginalFilename());
//        log.info("NOMBRE BLOB {} ", blobname);
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
        var imageEntity = repository.findByIdAndStatusTrue(imageId);
        return imageEntity.map(entity -> ImageResponse.builder()
                .imageId(entity.getId())
                .imageUrl(entity.getName())
                .build()).orElse(null);

    }


    private String generateImageName(long identifier) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");// include milliseconds
        String timestamp = dateFormat.format(Date.from(Instant.now()));
        Random random = new Random();
        int randomInt = random.nextInt(1000); // numero random ya que los milisegundos no fueron suficiente s y me duplicaba los nombres :(
        return identifier + "_" + timestamp + "_" + randomInt + ".png";
    }
}
