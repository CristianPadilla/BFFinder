package com.cpadilla.petservice.external.client;


import com.cpadilla.petservice.model.OwnerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE/user")
public interface OwnerService {


    @GetMapping("/{id}")
    public ResponseEntity<OwnerResponse> getUserById(@PathVariable("id") int userId);

}
