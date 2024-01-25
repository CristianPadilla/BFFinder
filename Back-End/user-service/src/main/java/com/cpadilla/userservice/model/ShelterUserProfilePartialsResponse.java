package com.cpadilla.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShelterUserProfilePartialsResponse {


    private long id;
    private String name;
    private String profileImageUrl;
}
