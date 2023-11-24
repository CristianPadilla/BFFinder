package com.cpadilla.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.Instant;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse extends UserResponse {

    private String surname;



//    private int socialStratum;
//    private int inHomeAvailableSpace;
//    private String profession;
//    private boolean ownHome;
//    private boolean hasPet;
//    private char health;
}
