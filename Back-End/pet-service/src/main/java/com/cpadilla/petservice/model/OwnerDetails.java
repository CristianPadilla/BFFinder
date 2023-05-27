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
public class OwnerDetails {

    private long userId;
    private String name;
    private String surname;
    private String phoneNumber;

//    private String password;
//    private String email;
//    private int socialStratum;
//    private String address;
//    private int inHomeAvailableSpace;
//    private int departmentId;
//    private int townId;
//    private String neighborhood;
//    private String profession;
//    private boolean ownHome;
//    private boolean hasPet;
//    private Instant birthDate;
//    private char health;
//    private boolean IsTypeFoundation;

}
