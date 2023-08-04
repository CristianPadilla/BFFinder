package com.cpadilla.petservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterRequest {

    private String size;
    private int specieId;
    private int breedId;
    private int cityId;
    private int departmentId;

}
