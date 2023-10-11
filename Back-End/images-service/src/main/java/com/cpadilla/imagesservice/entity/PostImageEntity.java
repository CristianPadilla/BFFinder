package com.cpadilla.imagesservice.entity;


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
    @Column(name = "id_image_post")
    private int id;
    @Column(name = "image_id")
    private int imageId;
    @Column(name = "post_id")
    private int postId;

    @ManyToOne
    @JoinColumn(name = "image_id")
    @MapsId("id")
    private ImageEntity imageEntity;
}
