package com.cpadilla.imagesservice;

import com.cpadilla.imagesservice.model.FirebaseCredential;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
@Log4j2
public class ImagesServiceApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(ImagesServiceApplication.class, args);





    }


//    private InputStream createFirebaseCredential() throws Exception {
//        //private key
//        String privateKey = "8d32adcb31592681846c47106bd1831def5a0a1a".replace("\\n", "\n");
//
//        FirebaseCredential firebaseCredential = new FirebaseCredential();
//        firebaseCredential.setType("FIREBASE_TYPE");
//        firebaseCredential.setProject_id(projectId);
//        firebaseCredential.setPrivate_key_id("FIREBASE_PRIVATE_KEY_ID");
//        firebaseCredential.setPrivate_key(privateKey);
//        firebaseCredential.setClient_email("FIREBASE_CLIENT_EMAIL");
//        firebaseCredential.setClient_id("FIREBASE_CLIENT_ID");
//        firebaseCredential.setAuth_uri("FIREBASE_AUTH_URI");
//        firebaseCredential.setToken_uri("FIREBASE_TOKEN_URI");
//        firebaseCredential.setAuth_provider_x509_cert_url("FIREBASE_AUTH_PROVIDER_X509_CERT_URL");
//        firebaseCredential.setClient_x509_cert_url("FIREBASE_CLIENT_X509_CERT_URL");
//
//        //serialize with Jackson
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonString = mapper.writeValueAsString(firebaseCredential);
//
//        //convert jsonString string to InputStream using Apache Commons
//        return IOUtils.toInputStream(jsonString);
//    }


}
