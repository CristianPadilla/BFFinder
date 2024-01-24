package com.cpadilla.adoptionpostservice.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionPostPartialsResponse {

    private int id;
    private boolean status;
    private String date;
    private PetPartialResponse petPartialResponse;
    private List<ImageResponse> images;
    private UserPartialsResponse user;
    private LocationPartialResponse locationResponse;
}
