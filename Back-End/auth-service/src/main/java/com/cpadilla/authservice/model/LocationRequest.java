package com.cpadilla.authservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LocationRequest {

    private String address;
    @JsonProperty("more_info")
    private String moreInfo;
    private String neighborhood;
    @JsonProperty("city_id")
    private int cityId;
}
