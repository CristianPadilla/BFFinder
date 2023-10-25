package com.cpadilla.imagesservice.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.Instant;

@Service
@Log4j2
public class GoogleCloudStorageImageService implements CloudStorageService {


    @Value("${app.google-cloud-base-url-path}")
    private String StorageBaseUrl;

    @Value("${app.google-cloud-images-folder-path}")
    private String imagesBasePath;

    @Value("${app.google-cloud-profile-images-folder}")
    private String profileImagesPath;

    @Value("${app.google-cloud-post-images-folder}")
    private String postImagesPath;

    private Bucket bucket;


    @PostConstruct
    private void initializeCloudStorage() throws Exception {
//                String projectId = "bffinder-e5a52.appspot.com";
        log.info("Initializing google cloud storage bucket");
        var GoogleCloudCredentials = new ClassPathResource("bffinder-e5a52-firebase-adminsdk-ljp99-2a298a8b07.json"); // credentials file generated from web google cloud console
        FileInputStream serviceAccount = new FileInputStream(GoogleCloudCredentials.getFile());

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("bffinder-e5a52.appspot.com")
                .build();
        FirebaseApp.initializeApp(options);

        bucket = StorageClient.getInstance().bucket("bffinder-e5a52.appspot.com");
    }

    @Override
    public String uploadProfileImage(String blobName, MultipartFile image) {
        log.info("uploading blob named {} from google cloud storage service ", blobName);
        try {
            Blob blob = bucket.create(imagesBasePath + profileImagesPath + blobName, image.getBytes(), "image/png");
            var imageUrl = StorageBaseUrl + blob.getName();
            log.info("created blob name: " + blob.getName() + " at url: " + imageUrl);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public String uploadPostImage(String blobName, MultipartFile image) {
        log.info("uploading blob named {} from google cloud storage service ", blobName);
        try {
            Blob blob = bucket.create(imagesBasePath + postImagesPath + blobName, image.getBytes(), "image/png");
            var imageUrl = StorageBaseUrl + blob.getName();
            log.info("created blob name: " + blob.getName() + " at url: " + imageUrl);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
