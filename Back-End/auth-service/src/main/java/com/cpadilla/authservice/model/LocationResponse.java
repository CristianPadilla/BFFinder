package com.cpadilla.authservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationResponse {

    private int id;
    private String address;
    @JsonProperty("more_info")
    private String moreInfo;
    private String neighborhood;
    private CityResponse city;


}
