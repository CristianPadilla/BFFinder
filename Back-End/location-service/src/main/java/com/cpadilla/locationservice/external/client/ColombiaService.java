package com.cpadilla.locationservice.external.client;


import com.cpadilla.locationservice.model.CityResponse;
import com.cpadilla.locationservice.model.DepartmentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@FeignClient(name = "COLOMBIA-SERVICE", url = "https://api-colombia.com/api/v1")
public interface ColombiaService {

    @GetMapping("/Department")
    ResponseEntity<List<DepartmentResponse>> getDepartments();

    @GetMapping("/Department/{departmentId}/cities")
    ResponseEntity<List<CityResponse>> getCitiesByDepartment(@PathVariable("departmentId") int departmentId);
}
