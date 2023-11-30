package com.cpadilla.adoptionpostservice.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionPostRequest {

    private int id;
    private String description;
    @JsonProperty("pet_id")
    private int petId;
    private LocationRequest location;
}
