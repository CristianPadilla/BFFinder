package com.cpadilla.locationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LocationRequest {

    private String address;
    private String moreInfo;
    private String neighborhood;
    private int cityId;
}
