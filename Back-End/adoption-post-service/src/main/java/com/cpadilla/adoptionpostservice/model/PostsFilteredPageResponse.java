package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostsFilteredPageResponse {

    public Page<AdoptionPostPartialsResponse> page;
    public PostsRequest request;
}
