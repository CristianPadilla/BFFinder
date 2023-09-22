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
import java.nio.charset.StandardCharsets;

@Service
@Log4j2
public class GoogleCloudStorageImageService implements ImageService {


    @Value("${app.google-cloud-base-url-path}")
    private String StorageBaseUrl;

    @Value("${app.google-cloud-images-folder}")
    private String imagesPath;

    @Value("${app.google-cloud-profiles-folder}")
    private String profilesPath;

    @Value("${app.google-cloud-posts-folder}")
    private String postsPath;

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


        String blobName = "bffinder/blobCristian"+userId;
        Blob blob = bucket.create(blobName, "Hello, World!".getBytes(StandardCharsets.UTF_8), "text/plain");


        System.out.println("=========== BLOB INFO: " + blob);

        //https://storage.googleapis.com/bffinder-e5a52.appspot.com/bffinder/image.png

        log.info("=============HOLAAAA:  " + StorageBaseUrl);
        log.info("=============HOLAAAA:  " + imagesPath);
        return null;
    }
}
