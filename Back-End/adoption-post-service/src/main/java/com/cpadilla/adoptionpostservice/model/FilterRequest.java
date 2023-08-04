package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterRequest {

    private String date;
    private String size;
    private int specieId;
    private int breedId;
    private int cityId;
    private int departmentId;

//    private List<SearchRequest> searchRequests;
}
