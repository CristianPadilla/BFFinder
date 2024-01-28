package com.cpadilla.authservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
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
    private String nit;
    @JsonProperty(value = "commercial_registration_number")
    private String comercialRegistrationNumber;
    private LocationRequest location;
//    private String description;
//    private String phone;
//    private String dateOfCreation;
//    private String webPageUrl;
    private String password;
}
