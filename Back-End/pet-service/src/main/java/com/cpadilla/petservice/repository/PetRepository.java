package com.cpadilla.petservice.repository;


import com.cpadilla.petservice.entity.PetEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<PetEntity, Integer>, JpaSpecificationExecutor<PetEntity> {

    List<PetEntity> findAllByOwnerIdAndStatusIsTrue(int ownerId);

    Optional<PetEntity> findByIdAndStatusTrue(int petId);

    Page<PetEntity> findAll(Specification<PetEntity> specification, Pageable pageable);
    List<PetEntity> findAll(Specification<PetEntity> specification);

}
