package com.cpadilla.petservice.model;

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
    private char gender;
    private boolean sterilized;
//    private boolean status;
    private boolean dewormed;
    private boolean isPublished;
    private String profileImageUrl;

    private OwnerDetails ownerDetails;
    private BreedDetails breedDetails;


}
