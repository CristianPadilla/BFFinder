package com.cpadilla.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private long userId;
    private String name;
    private String surname;
    private String password;
    private String email;
    private String phoneNumber;
    private int socialStratum;
    private int inHomeAvailableSpace;
    private String profession;
    private boolean ownHome;
    private boolean hasPet;
    private String imageUrl;
    private Instant birthDate;
    private char health;
}
