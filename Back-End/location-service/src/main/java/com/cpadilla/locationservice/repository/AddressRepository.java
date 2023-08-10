package com.cpadilla.locationservice.repository;

import com.cpadilla.locationservice.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<AddressEntity,Integer> {
}
