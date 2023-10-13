package com.cpadilla.imagesservice.repository;

import com.cpadilla.imagesservice.entity.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostImageRepository extends JpaRepository<PostImageEntity, Integer> {
}
