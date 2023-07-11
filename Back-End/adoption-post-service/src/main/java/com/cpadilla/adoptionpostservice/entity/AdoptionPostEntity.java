package com.cpadilla.adoptionpostservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "adoption_post")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptionPostEntity {

    @Id
    @Column(name = "adoption_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String description;
    private boolean status;
    private Instant date;
    @Column(name = "pet_id")
    private int petId;
    @Column(name = "user_id")
    private int userId;


}
