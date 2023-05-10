package com.cpadilla.authservice.repository;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredentialsRepository extends JpaRepository<UserCredentialsEntity, Integer> {
}
