package com.cpadilla.petservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PetsFilterRequest {

    private String size;
    @JsonProperty("specie_id")
    private int specieId;
    @JsonProperty("breed_id")
    private int breedId;
    private String search;
    @Positive
    private int age;
    private String sort;
    private boolean desc;
    private Boolean vaccinated;
    private Boolean sterilized;
    private Boolean dewormed;
    private int page;
    @JsonProperty("page_size")
    private int pageSize;
    private Boolean posted;
}
