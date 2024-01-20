package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
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
public interface AdoptionPostRepository extends JpaRepository<AdoptionPostEntity, Integer>, JpaSpecificationExecutor<AdoptionPostEntity> {

    List<AdoptionPostEntity> findAllByPetId(int petId);

    Optional<AdoptionPostEntity> findByIdAndStatusIsTrue(int userId);

    List<AdoptionPostEntity> findAllByUserIdAndStatusIsTrue(int userId);

    List<AdoptionPostEntity> findAllByStatusTrue(Sort sort);

    Page<AdoptionPostEntity> findAll(Specification<AdoptionPostEntity> specification, Pageable pageable);

    Optional<AdoptionPostEntity> findByPetId(int petId);

    Optional<AdoptionPostEntity> findByPetIdAndStatusIsTrue(int petId);

}
