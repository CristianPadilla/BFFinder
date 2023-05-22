package com.cpadilla.userservice.service;

import com.cpadilla.userservice.entity.UserEntity;
import com.cpadilla.userservice.exception.UserServiceCustomException;
import com.cpadilla.userservice.model.UserCredentialsResponse;
import com.cpadilla.userservice.model.UserRequest;
import com.cpadilla.userservice.model.UserResponse;
import com.cpadilla.userservice.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public long saveUser(UserRequest user) {
        return 0;
    }

    @Override
    public UserResponse getUserById(long userId) {
        log.info("from service layer: getting user by id {}", userId);
        UserEntity userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        return UserResponse.builder().userId(userEntity.getUserId())
                .name(userEntity.getName())
                .surname(userEntity.getSurname())
                .email(userEntity.getEmail())
                .phoneNumber(userEntity.getPhoneNumber())
                .socialStratum(userEntity.getSocialStratum())
                .address(userEntity.getAddress())
                .inHomeAvailableSpace(userEntity.getInHomeAvailableSpace())
                .departmentId(userEntity.getDepartmentId())
                .townId(userEntity.getTownId())
                .neighborhood(userEntity.getNeighborhood())
                .profession(userEntity.getProfession())
                .ownHome(userEntity.getOwnHome())
                .hasPet(userEntity.getHasPet())
                .birthDate(userEntity.getBirthDate())
                .health(userEntity.getHealth())
                .IsTypeFoundation(userEntity.getIsTypeFoundation())
                .build();

    }

    @Override
    public UserCredentialsResponse getUserCredentialsByEmail(String email) {
        log.info("from service layer: getting user by email {}", email);
        UserEntity userEntity = repository.findByEmail(email)
                .orElseThrow(() -> new UserServiceCustomException("user with given email not found", "USER_NOT_FOUND"));

        return UserCredentialsResponse.builder().userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .build();
    }

    @Override
    public UserCredentialsResponse getUserCredentialsById(long userId) {
        log.info("from service layer: getting user credentials by user id {}", userId);
        UserEntity userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        return UserCredentialsResponse.builder().userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .build();
    }
}
