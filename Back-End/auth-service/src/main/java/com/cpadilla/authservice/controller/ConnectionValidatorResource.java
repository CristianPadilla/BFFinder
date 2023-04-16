package com.cpadilla.authservice.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/validateToken")
@Log4j2
public class ConnectionValidatorResource {

    @GetMapping("/{id}")
    public void getUserCredentialsById(@PathVariable("id") int userId) {
        log.info("BUEEEEEEEEEEEEEEE", userId);
//        return new ResponseEntity<>(service.getUserCredentialsById(userId), HttpStatus.OK);

    }

//    @Getter
//    @Builder
//    @ToString
//    public class ConnValidationResponse {
//        private String status;
//        private boolean isAuthenticated;
//        private String methodType;
//        private String username;
////        private List<GrantedAuthority> authorities;
//    }

}
