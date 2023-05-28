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

}
