package com.cpadilla.authservice.repository;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialsRepository extends JpaRepository<UserCredentialsEntity, Integer> {

    Optional<UserCredentialsEntity> findByEmail(String email);
}
