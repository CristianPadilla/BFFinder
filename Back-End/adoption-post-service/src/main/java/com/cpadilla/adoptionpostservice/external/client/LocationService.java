package com.cpadilla.adoptionpostservice.external.client;

import com.cpadilla.adoptionpostservice.model.LocationRequest;
import com.cpadilla.adoptionpostservice.model.LocationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@FeignClient(name = "LOCATION-SERVICE/location")
public interface LocationService {

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getById(@PathVariable("id") int addressId);


    @PostMapping("/save")
    public ResponseEntity<Integer> saveAddress(@RequestBody LocationRequest locationRequest);

    @PutMapping("/update")
    public ResponseEntity<Integer> updateAddress(@RequestBody LocationRequest locationRequest);
}
