package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetResponse {

    private int id;
    private String name;
    private double weight;
    private int age;
    private boolean vaccinated;
    private boolean dangerous;
    private char size;
    private boolean sterilized;
    private boolean status;
    private boolean dewormed;
    private char gender;

    private UserOwnerResponse userOwnerResponse;
    private BreedDetails breedDetails;


}
