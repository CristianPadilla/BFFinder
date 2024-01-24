package com.cpadilla.adoptionpostservice.repository;

import com.cpadilla.adoptionpostservice.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Integer> {

    List<QuestionEntity> findAllByPostId(int postId);

    int countByPostId(int postId);

}
