package com.cpadilla.authservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int id;
    @Column(name = "address_id")
    private Integer addressId;
    private String name;
    private String surname;
    private String nit;
    @Column(name = "phone_number")
    private String phone;
    @Column(name = "commercial_reg_num")
    private String comercialRegistrationNumber;
    private char role;
    @Column(name = "is_shelter_enabled")
    private Character shelterEnabled;
    private String email;
    private String password;

}
