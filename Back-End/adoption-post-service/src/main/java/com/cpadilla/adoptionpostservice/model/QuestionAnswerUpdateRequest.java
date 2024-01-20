package com.cpadilla.adoptionpostservice.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionAnswerUpdateRequest {

    @NotNull
    @NotEmpty(message = "the answer is mandatory")
    @Size(min = 10, max = 250, message = "the answer must be between 10 and 255 characters")
    private String answer;
    @Positive(message = "try a valid question id value")
    private int questionId;
}
