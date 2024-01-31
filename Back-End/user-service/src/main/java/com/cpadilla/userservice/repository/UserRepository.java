package com.cpadilla.userservice.repository;

import com.cpadilla.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findAllByRoleOrderByBirthDate(Character role);

    List<UserEntity> findAllByRoleAndAndShelterEnabled(Character rol, Character shelterEnabled);


}
