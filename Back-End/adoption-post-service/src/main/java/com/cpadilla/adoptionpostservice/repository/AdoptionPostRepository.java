package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionPostRepository extends JpaRepository<AdoptionPostEntity, Integer> {

    List<AdoptionPostEntity> findAllByPetId(int petId);

    AdoptionPostEntity findByPetId(int petId);

}
