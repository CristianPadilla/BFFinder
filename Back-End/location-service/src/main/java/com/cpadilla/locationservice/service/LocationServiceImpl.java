package com.cpadilla.locationservice.service;

import com.cpadilla.locationservice.entity.AddressEntity;
import com.cpadilla.locationservice.exception.CustomException;
import com.cpadilla.locationservice.model.LocationRequest;
import com.cpadilla.locationservice.model.LocationResponse;
import com.cpadilla.locationservice.model.CityResponse;
import com.cpadilla.locationservice.model.DepartmentResponse;
import com.cpadilla.locationservice.repository.AddressRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class LocationServiceImpl implements LocationService {

    @Autowired
    private AddressRepository repository;


    @Override
    public LocationResponse getAddressById(int id) {
        log.info("getting address with id {}", id);

        var addressEntity = repository.findById(id)
                .orElseThrow(() -> new CustomException("address not found for id: " + id, "ADDRESS_NOT_FOUND", HttpStatus.NOT_FOUND.value()));

        var department = DepartmentResponse.builder()
                .name(addressEntity.getCity().getDepartment().getName())
                .build();

        var city = CityResponse.builder()
                .name(addressEntity.getCity().getName())
                .department(department)
                .build();

        return LocationResponse.builder()
                .id(addressEntity.getId())
                .address(addressEntity.getAddress())
                .neighborhood(addressEntity.getNeighborhood())
                .moreInfo(addressEntity.getMoreInfo())
                .city(city)
                .build();
    }

    @Override
    public int saveAddress(LocationRequest locationRequest) {

        var addressEntity = AddressEntity.builder()
                .address(locationRequest.getAddress())
                .moreInfo(locationRequest.getMoreInfo())
                .neighborhood(locationRequest.getNeighborhood())
                .cityId(locationRequest.getCityId())
                .build();
        return repository.save(addressEntity).getId();
    }
}
