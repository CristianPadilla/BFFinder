package com.cpadilla.imagesservice.service;

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


    @Override
    public String updateProfileImage(String userId, MultipartFile image) {
        log.info("updating profile image for user id {} from image service ", userId);
        var imageName = generateImageName(userId);
        var blobname = "/" + userId + "/" + imageName; // image name must include user id folder
        var createdBlobName = storageService.uploadProfileImage(blobname, image);


        //TODO handle database stuff


        return createdBlobName;
    }


    private String generateImageName(String identifier) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");// include milliseconds
        String timestamp = dateFormat.format(Date.from(Instant.now()));
        return identifier + "_" + timestamp + ".png";
    }
}
