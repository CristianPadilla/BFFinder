package com.cpadilla.adoptionpostservice.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequest {

//    private int id;
    @NotNull
    @NotEmpty(message = "the question is mandatory")
    @Size(min = 10, max = 250, message = "the question must be between 10 and 255 characters")
    private String question;
    @Positive(message = "the post id must be positive")
    private int postId;
    @Positive(message = "the user id must be positive")
    private int userId;


}
