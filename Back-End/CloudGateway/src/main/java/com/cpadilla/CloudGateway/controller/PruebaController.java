//package com.cpadilla.CloudGateway.controller;
//
//import com.cpadilla.CloudGateway.model.UserCredentialsResponse;
//import com.cpadilla.CloudGateway.service.UserDetailsService;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import reactor.core.publisher.Mono;
//
//import java.time.Duration;
//
//
//@Log4j2
//@RestController
//@RequestMapping("/prueba")
//public class PruebaController {
//
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//    @Autowired
//    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService2;
//
////    @Autowired
////    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService2;
//
//
//    @GetMapping("/user/{id}")
//    public ResponseEntity<Mono<UserCredentialsResponse>> getUserCredentialsById(@PathVariable("id") int userId) {
//        return new ResponseEntity<>(userDetailsService.getUserCredentialsById(userId), HttpStatus.OK);
//
//    }
//
//
//    @GetMapping("/user/email/{email}")
//    public ResponseEntity<Mono<UserCredentialsResponse>> getUserCredentialsByEmail(@PathVariable("email") String email) {
//        log.info("HOLAAAAAAAA111111111111111");
//
////        UserDetails us = userDetailsService2.loadUserByUsername(email);
////        log.info("USERRRRRRRR11111 : {}", us.toString());
////        UserCredentialsResponse userCredentialsResponse = userDetailsService.getUserCredentialsByEmail(email).share().block();
////        log.info("USERRRRRRRR22222 : {}", userCredentialsResponse.toString());
//        return new ResponseEntity<>(userDetailsService.getUserCredentialsByEmail(email), HttpStatus.OK);
//
//    }
//
//
//}
