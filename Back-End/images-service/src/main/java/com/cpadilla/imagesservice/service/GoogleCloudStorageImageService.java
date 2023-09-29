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
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Service
@Log4j2
public class GoogleCloudStorageImageService implements ImageService {


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
    public String updateProfileImage(String userId, MultipartFile image) {
        //https://storage.googleapis.com/bffinder-e5a52.appspot.com/bffinder/image.png

        var imageName = generateImageName(userId);
        var blobname = imagesBasePath + profileImagesPath + "/" + userId + "/" + imageName;
        var createdBlobName = updateImage(blobname, image);

        //TODO handle database stuff

        return null;
    }


    private String updateImage(String blobName, MultipartFile image) {
        log.info("blob name to upload =========; " + blobName);
        try {
            Blob blob = bucket.create(blobName, image.getBytes(), "image/png");
            log.info("created blob name: " + blob.getName());
            return blob.getName();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    public String generateImageName(String identifier) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");// include milliseconds
        String timestamp = dateFormat.format(Date.from(Instant.now()));
        return identifier + "_" + timestamp + ".png";
    }
}
