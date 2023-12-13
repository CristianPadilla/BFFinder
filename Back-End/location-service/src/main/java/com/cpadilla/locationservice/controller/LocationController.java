package com.cpadilla.locationservice.controller;

import com.cpadilla.locationservice.model.CityResponse;
import com.cpadilla.locationservice.model.DepartmentResponse;
import com.cpadilla.locationservice.model.LocationRequest;
import com.cpadilla.locationservice.model.LocationResponse;
import com.cpadilla.locationservice.service.LocationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
@Log4j2
public class LocationController {

    @Autowired
    private LocationService service;


    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getById(@PathVariable("id") int addressId) {
        log.info("Getting address with id {}", addressId);
        return new ResponseEntity<>(service.getAddressById(addressId), HttpStatus.OK);
    }

    @GetMapping("/department/all")
    public ResponseEntity<List<DepartmentResponse>> getDepartments() {
        return new ResponseEntity<>(service.getDepartments(), HttpStatus.OK);
    }

    @GetMapping("/department/{departmentId}/cities")
    public ResponseEntity<List<CityResponse>> getDepartments(@PathVariable("departmentId") int departmentId) {
        return new ResponseEntity<>(service.getCitiesByDepartment(departmentId), HttpStatus.OK);
    }


    @PostMapping("/save")
    public ResponseEntity<Integer> saveAddress(@RequestBody LocationRequest locationRequest) {
        return new ResponseEntity<>(service.saveAddress(locationRequest), HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<Integer> updateAddress(@RequestBody LocationRequest locationRequest) {
        return new ResponseEntity<>(service.updateAddress(locationRequest), HttpStatus.OK);
    }
}
