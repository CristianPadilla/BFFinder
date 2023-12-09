package com.cpadilla.petservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterRequest {

    private String size;
    @JsonProperty("specie_id")
    private int specieId;
    @JsonProperty("breed_id")
    private int breedId;
    private String name;
    private int age;
    private int page;
    @JsonProperty("page_size")
    private int pageSize;
    private String sort;
}
