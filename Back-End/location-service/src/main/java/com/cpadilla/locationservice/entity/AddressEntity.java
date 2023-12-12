package com.cpadilla.locationservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "address")
public class AddressEntity {


    @Id
    @Column(name = "address_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String address;
    @Column(name = "aditional_info")
    private String moreInfo;
    private String neighborhood;

    @Column(name = "city_id")
    private Integer cityId;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "city_id", referencedColumnName = "city_id", insertable = false, updatable = false)
//    private CityEntity city;


}
