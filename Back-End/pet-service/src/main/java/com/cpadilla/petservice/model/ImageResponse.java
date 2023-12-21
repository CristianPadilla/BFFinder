package com.cpadilla.petservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponse {

    private int imageId;
    private String imageUrl;
    private Instant uploadDate;
}
