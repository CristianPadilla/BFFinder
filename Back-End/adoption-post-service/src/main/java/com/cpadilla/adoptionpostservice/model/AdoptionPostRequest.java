package com.cpadilla.adoptionpostservice.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionPostRequest {

    private int id;
    @NotEmpty(message = "the description is mandatory")
    private String description;
    @Positive(message = "not valid value for pet id")
    private int petId;
    private LocationRequest location;
}
