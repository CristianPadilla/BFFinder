package com.cpadilla.imagesservice.repository;

import com.cpadilla.imagesservice.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

//    List<ImageEntity> findAllBy
}
