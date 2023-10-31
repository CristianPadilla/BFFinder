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
    private Integer nit;
    @Column(name = "commercial_reg_num")
    private Integer comercialRegistrationNumber;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "social_stratum")
    private Integer socialStratum;
    private String address;
    @Column(name = "in_home_space")
    private Integer inHomeAvailableSpace;
    @Column(name = "department_id")
    private Integer departmentId;
    @Column(name = "town_id")
    private Integer townId;
    private String neighborhood;
    private String profession;
    @Column(name = "own_home")
    private Boolean ownHome;
    @Column(name = "has_pet")
    private Boolean hasPet;
    @Column(name = "date_of_birth")
    private Instant birthDate;
    private Character health;
    @Column(name = "type_foundation")
    private Boolean IsTypeFoundation;

}
