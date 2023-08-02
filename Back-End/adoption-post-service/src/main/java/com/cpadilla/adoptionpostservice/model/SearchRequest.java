package com.cpadilla.adoptionpostservice.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class SearchRequest {

    private String filter;
    private String value;
}
