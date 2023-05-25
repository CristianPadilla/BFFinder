package com.cpadilla.specieservice.repository;

import com.cpadilla.specieservice.entity.SpecieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecieRepository extends JpaRepository<SpecieEntity, Integer> {
}
