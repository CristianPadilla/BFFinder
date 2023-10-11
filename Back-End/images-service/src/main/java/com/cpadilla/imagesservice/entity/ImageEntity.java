package com.cpadilla.imagesservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Entity
@Table(name = "image")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_image")
    private int id;
    private String name;
    private boolean status;

}
