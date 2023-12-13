package com.cpadilla.petservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PetsFilters {

    private int specieId;
    private int breedId;
    private int age;
    private String status;
    private String size;
    private String search;
    private int ownerId;

}
