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
    private String name;
    private String surname;
    private String nit;
    @Column(name = "phone_number")
    private String phone;
    @Column(name = "commercial_reg_num")
    private String comercialRegistrationNumber;
    private char role;
    private String email;
    private String password;

}
