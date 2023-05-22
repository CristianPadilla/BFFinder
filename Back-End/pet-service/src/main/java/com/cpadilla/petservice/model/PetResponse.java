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

    private int petId;
    private String name;
    private double weight;
    private int age;
    private boolean vaccined;
    private boolean dangerous;
    private char size;
    private boolean sterilized;
    private boolean status;



}
