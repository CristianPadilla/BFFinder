package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdoptionPostRepository extends JpaRepository<AdoptionPostEntity, Integer> {

    List<AdoptionPostEntity> findAllByPetId(int petId);
    List<AdoptionPostEntity> findAllByUserIdAndStatusIsTrue(int userId);

    Optional<AdoptionPostEntity> findByPetId(int petId);

}
