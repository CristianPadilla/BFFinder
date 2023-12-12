package com.cpadilla.adoptionpostservice.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostFilters {

    private String status;
    private String fromDate;
    private boolean specificDate;
    private int cityId;
    private int departmentId;
    private int userId;
}
