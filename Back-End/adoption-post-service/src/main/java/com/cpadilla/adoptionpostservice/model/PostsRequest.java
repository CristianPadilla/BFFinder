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
public class PostsRequest {

    private String search;
    private PostFiltersRequest filters;
    private PostSortingRequest sorting;
    private int page;
    @JsonProperty("page_size")
    private int pageSize;

}
