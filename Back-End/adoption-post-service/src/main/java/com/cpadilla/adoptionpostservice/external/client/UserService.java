package com.cpadilla.adoptionpostservice.external.client;


import com.cpadilla.adoptionpostservice.model.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE/user")
public interface UserService {


    @GetMapping("/{id}")
    ResponseEntity<UserResponse> getUserById(@PathVariable("id") int userId);

}
