package com.cpadilla.petservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pet")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PetEntity {

    @Id
    @Column(name = "pet_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private Double weight;
    private Integer age;
    private Boolean vaccinated;
    private Boolean dangerous;
    private Character size;
    private Boolean sterilized;
    private Boolean status;
    private Boolean dewormed;
    private Character gender;
    @Column(name = "owner_id")
    private Integer ownerId;
    @Column(name = "breed_id")
    private Integer breedId;
    @Column(name = "image_id")
    private Integer imageId;


}
