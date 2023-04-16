package com.cpadilla.CloudGateway.external.client;

import com.cpadilla.CloudGateway.model.UserCredentialsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import reactivefeign.spring.config.ReactiveFeignClient;
import reactor.core.publisher.Mono;

//@ReactiveFeignClient(name = "USER-SERVICE/user")
public interface UserService {

    @GetMapping("/credentials/{id}")//copied method signature from UserController in USER_SERVICE
    public Mono<ResponseEntity<UserCredentialsResponse>> getUserCredentialsById(@PathVariable("id") int userId);

}
