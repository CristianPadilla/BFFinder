package com.cpadilla.adoptionpostservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationRequest {

    private int id;
    @JsonProperty("city_id")
    private int cityId;
}
