package com.cpadilla.breedservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecieDetails {

    private int id;
    private String name;
    private String description;

}
