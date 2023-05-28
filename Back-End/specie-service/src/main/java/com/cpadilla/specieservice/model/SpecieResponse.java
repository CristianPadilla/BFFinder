package com.cpadilla.specieservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpecieResponse {

    private int id;
    private String name;
    private String description;

}
