package com.cpadilla.breedservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BreedResponse {

    private int id;
    private String name;
    private SpecieDetails specie;

}
