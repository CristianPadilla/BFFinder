package com.cpadilla.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;
    private String name;
    private String surname;
    private String password;
    private String email;
    private String nit;
    private String description;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "commercial_reg_num")
    private String commercialRegistrationNumber;
    @Column(name = "social_stratum")
    private Integer socialStratum;
    @Column(name = "in_home_space")
    private Integer inHomeAvailableSpace;
    private String profession;
    @Column(name = "own_home")
    private Boolean ownHome;
    @Column(name = "has_pet")
    private Boolean hasPet;
    @Column(name = "date_of_birth")
    private Instant birthDate;
    private Character health;
    @Column(name = "address_id")
    private Integer addressId;
    private Character role;
    @Column(name = "web_page_url")
    private String webPageUrl;
    @Column(name = "image_id")
    private Integer imageId;
    @Column(name = "is_shelter_enabled")
    private char shelterEnabled;

}
