package com.cpadilla.petservice.repository;


import com.cpadilla.petservice.entity.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<PetEntity, Integer> {

    List<PetEntity> findAllByOwnerId(int ownerId);

}
