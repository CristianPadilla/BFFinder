package com.cpadilla.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String dateOfBirth;
    private LocationRequest location;
}