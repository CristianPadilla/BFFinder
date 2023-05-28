package com.cpadilla.petservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecieResponse {

    private int id;
    private String name;
    private String description;

}
