package com.cpadilla.userservice.model;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ShelterUserProfileResponse extends UserResponse{

    private String nit;
    private String description;
    @Column(name = "commercial_reg_num")
    private String commercialRegistrationNumber;

}
