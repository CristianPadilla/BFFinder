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
    private String description;
    @Column(name = "phone_number")
    private String phone;
    @Column(name = "date_of_birth")
    private Instant date;
    private char role;
    @Column(name = "web_page_url")
    private String webPage;
    @Column(name = "address_id")
    private int addressId;
    private String email;
    private String password;

}
