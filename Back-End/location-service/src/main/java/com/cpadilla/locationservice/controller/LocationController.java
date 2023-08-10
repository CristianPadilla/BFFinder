package com.cpadilla.locationservice.controller;

import com.cpadilla.locationservice.model.LocationRequest;
import com.cpadilla.locationservice.model.LocationResponse;
import com.cpadilla.locationservice.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService service;


    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getById(@PathVariable("id") int addressId) {
        return new ResponseEntity<>(service.getAddressById(addressId), HttpStatus.OK);
    }


    @PostMapping("/save")
    public ResponseEntity<Integer> saveAddress(@RequestBody LocationRequest locationRequest) {
        return new ResponseEntity<>(service.saveAddress(locationRequest), HttpStatus.OK);
    }
}