package com.cpadilla.locationservice.service;

import com.cpadilla.locationservice.model.CityResponse;
import com.cpadilla.locationservice.model.DepartmentResponse;
import com.cpadilla.locationservice.model.LocationRequest;
import com.cpadilla.locationservice.model.LocationResponse;

import java.util.List;

public interface LocationService {

    LocationResponse getAddressById(int id);

    int saveAddress(LocationRequest locationRequest);

    int updateAddress(LocationRequest locationRequest);

    List<DepartmentResponse> getDepartments();

    List<CityResponse> getCitiesByDepartment(int departmentId);

}
