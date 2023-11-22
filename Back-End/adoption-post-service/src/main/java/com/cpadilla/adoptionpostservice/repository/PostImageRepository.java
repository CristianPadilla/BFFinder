package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImageEntity, Integer> {

    PostImageEntity findByPostIdAndImageId(int postId, int imageId);

    List<PostImageEntity> findAllByPostId(int postId);


}
