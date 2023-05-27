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
public class AdoptionPostResponse {

    private int id;
    private String description;
    private boolean status;
    private Instant date;

    private PetDetails petDetails;
}
