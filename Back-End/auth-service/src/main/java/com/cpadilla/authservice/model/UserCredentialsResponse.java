package com.cpadilla.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialsResponse {

    private long userId;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String photoUrl;
    private char role;
    private Character shelterEnabled;

}
