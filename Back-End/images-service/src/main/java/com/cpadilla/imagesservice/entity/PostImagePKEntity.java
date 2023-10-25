package com.cpadilla.imagesservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PostImagePKEntity implements Serializable {

    private int id;
    @Column(name = "image_id")
    private int imageId;
    @Column(name = "post_id")
    private int postId;
}
