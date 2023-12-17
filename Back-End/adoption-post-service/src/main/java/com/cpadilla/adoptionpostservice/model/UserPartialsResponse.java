package com.cpadilla.adoptionpostservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.Instant;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserPartialsResponse {

    private long userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String profileImageUrl;
}
