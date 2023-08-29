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
public class AdoptionPostPartialsResponse {

    private int id;
    private boolean status;
    private Instant date;
    private PetPartialDetails petDetails;
    private LocationDetails locationDetails;
}
