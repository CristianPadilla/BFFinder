package com.cpadilla.breedservice.repository;

import com.cpadilla.breedservice.entity.BreedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreedRepository extends JpaRepository<BreedEntity, Integer> {

    List<BreedEntity> findAllBySpecieId(int specieId);

}
