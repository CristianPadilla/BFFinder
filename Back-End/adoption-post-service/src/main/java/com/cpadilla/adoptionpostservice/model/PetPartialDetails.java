package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetPartialDetails {

    private int id;
    private int age;
    private String name;
    private BreedDetails breedDetails;
    private char size;
}
