package com.cpadilla.adoptionpostservice.model;


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
    private boolean status;
    private int petId;
}
