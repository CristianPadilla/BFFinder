package com.cpadilla.adoptionpostservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostFiltersRequest {

    @JsonProperty("from_date")
    private String fromDate;
    @JsonProperty("specie_id")
    private int specieId;
    @JsonProperty("breed_id")
    private int breedId;
    @JsonProperty("city_id")
    private int cityId;
    @JsonProperty("department_id")
    private int departmentId;
    private String size;
    private String gender;
    private String status;
}
