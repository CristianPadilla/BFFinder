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
public class PostsByUserFilterRequest {

    @JsonProperty("from_date")
    private String fromDate;
    @JsonProperty("specie_id")
    private int specieId;
    @JsonProperty("breed_id")
    private int breedId;
    private char status;
    private int page;
    @JsonProperty("page_size")
    private int pageSize;
    @JsonProperty("name_search")
    private String nameSearch;
    private String sort;
    private boolean desc;


}
