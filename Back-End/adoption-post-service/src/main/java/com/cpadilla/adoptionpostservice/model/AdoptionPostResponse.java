package com.cpadilla.adoptionpostservice.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionPostResponse {

    private int id;
    private String description;
    private String date;
    private int questionsQuantity;
    private UserResponse user;
    private PetResponse petResponse;
    private LocationResponse locationResponse;
    private List<ImageResponse> images;
    private List<QuestionResponse> questions;
}
