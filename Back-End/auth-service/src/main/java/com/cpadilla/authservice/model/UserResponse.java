package com.cpadilla.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.Instant;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private long userId;
    private String name;
    private String password;
    private String email;
    private String phoneNumber;
    private String profileImageUrl;
    private char role;
    private Instant birthDate;
    private LocationResponse location;
}
