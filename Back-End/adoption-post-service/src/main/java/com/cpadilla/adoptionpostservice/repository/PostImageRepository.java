package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostImageRepository extends JpaRepository<PostImageEntity, Integer> {


}
