package com.cpadilla.adoptionpostservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "image_adoption_post")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "image_id")
    private int imageId;
    @Column(name = "post_id")
    private int PostId;

}
