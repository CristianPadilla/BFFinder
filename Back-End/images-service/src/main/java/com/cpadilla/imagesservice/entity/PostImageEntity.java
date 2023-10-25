package com.cpadilla.imagesservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "image_adoption_post")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostImageEntity {

    @EmbeddedId
    private PostImagePKEntity id;

    @ManyToOne
    @JoinColumn(name = "image_id", insertable = false, updatable = false)
//    @MapsId("id")// PK attribute in ImageEntity for when saving in cascade a postimage know wich image corresponds
    private ImageEntity imageEntity;

}
