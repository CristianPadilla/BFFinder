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
public class PostRequest {
    @JsonProperty("user_id")
    private int userId;
    @JsonProperty("adoption_post_request")
    private AdoptionPostRequest adoptionPostRequest;
}
