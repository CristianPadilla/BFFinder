package com.cpadilla.adoptionpostservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name = "question")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String description;
    private LocalDate date;
    private String answer;
    @Column(name = "answer_date")
    private LocalDate answerDate;
    @Column(name = "post_id")
    private int postId;
    @Column(name = "user_id")
    private int userId;
}
