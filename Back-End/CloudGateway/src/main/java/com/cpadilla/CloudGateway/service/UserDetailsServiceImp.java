//package com.cpadilla.CloudGateway.service;
//
//import com.cpadilla.CloudGateway.model.UserCredentialsResponse;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//@Service
//@Log4j2
//public class UserDetailsServiceImp implements UserDetailsService {
//
//
//    @Override
//    public Mono<UserCredentialsResponse> getUserCredentialsById(int userId) {
//        log.info("FROM GATEWAY SERVICE LAYER: getting user credentials by user id {}", userId);
//
//        return WebClient.create()
//                .get()
//                .uri("http://localhost:8080/user/credentials/" + userId)
//                .retrieve()
//                .bodyToMono(UserCredentialsResponse.class);
//    }
//
//    @Override
//    public Mono<UserCredentialsResponse> getUserCredentialsByEmail(String email) {
//        log.info("FROM GATEWAY SERVICE LAYER: getting user credentials by user email {}", email);
////        log.info("*******------------*************");
////        UserCredentialsResponse userCredentialsResponse = WebClient.create()
////                .get()
////                .uri("http://localhost:8080/user/credentials/email/" + email)
////                .retrieve()
////                .bodyToMono(UserCredentialsResponse.class).map(userCredentialsResponse1 -> {
////
////                });
////        log.info("JANIEEEEEE " + userCredentialsResponse);
////        log.info("*******------------*************");
//
//        return WebClient.create()
//                .get()
//                .uri("http://localhost:8080/user/credentials/email/" + email)
//                .retrieve()
//                .bodyToMono(UserCredentialsResponse.class);
//    }
//}
