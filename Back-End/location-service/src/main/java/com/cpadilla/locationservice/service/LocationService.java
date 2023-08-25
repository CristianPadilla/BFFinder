package com.cpadilla.locationservice.service;

import com.cpadilla.locationservice.model.LocationRequest;
import com.cpadilla.locationservice.model.LocationResponse;

public interface LocationService {

    LocationResponse getAddressById(int id);

    int saveAddress(LocationRequest locationRequest);

    int updateAddress(LocationRequest locationRequest);

}
