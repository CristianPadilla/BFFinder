package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {

    private int id;
    private String question;
    private String answer;
    private LocalDate answerDate;
    private AdoptionPostResponse post;
    private LocalDate date;
    private UserPartialsResponse user;

}
