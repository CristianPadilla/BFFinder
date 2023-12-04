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
public class FilterRequest {

    @JsonProperty("from_date")
    private String fromDate;
    private String size;
    @JsonProperty("specie_id")
    private int specieId;
    @JsonProperty("breed_id")
    private int breedId;
    @JsonProperty("city_id")
    private int cityId;
    private int page;
    @JsonProperty("page_size")
    private int pageSize;
    private String sort;
    private boolean desc;


}
