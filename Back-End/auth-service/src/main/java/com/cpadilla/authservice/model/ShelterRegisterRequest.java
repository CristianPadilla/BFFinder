package com.cpadilla.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShelterRegisterRequest {

    private String name;
    private String email;
    private LocationRequest location;
    private String description;
    private String phone;
    private String dateOfCreation;
    private String webPageUrl;
    private String password;
}
