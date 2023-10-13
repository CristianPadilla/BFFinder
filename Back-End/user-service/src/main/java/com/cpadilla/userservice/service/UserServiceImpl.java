package com.cpadilla.userservice.service;

import com.cpadilla.userservice.entity.UserEntity;
import com.cpadilla.userservice.exception.UserServiceCustomException;
import com.cpadilla.userservice.external.client.ImageService;
import com.cpadilla.userservice.model.UserCredentialsResponse;
import com.cpadilla.userservice.model.UserRequest;
import com.cpadilla.userservice.model.UserResponse;
import com.cpadilla.userservice.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ImageService imageService;

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
                .socialStratum(userEntity.getSocialStratum() != null ? userEntity.getSocialStratum() : 0)
                .inHomeAvailableSpace(userEntity.getInHomeAvailableSpace() != null ? userEntity.getInHomeAvailableSpace() : 0)
                .profession(userEntity.getProfession())
                .ownHome(userEntity.getOwnHome() != null ? userEntity.getOwnHome() : false)
                .hasPet(userEntity.getHasPet() != null ? userEntity.getHasPet() : false)
                .birthDate(userEntity.getBirthDate())
                .health(userEntity.getHealth() != null ? userEntity.getHealth() : 'G')
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

    @Override
    public UserResponse updateProfileImage(long userId, MultipartFile image) {

        log.info("updating profile photo for user with id: {} from service layer", userId);
        var userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        log.info("11 {}  22  {} 33  {}", userId, image.getName(), userEntity.getImageId() != null && userEntity.getImageId() > 0 ? userEntity.getImageId() : 0);
        var newImage =
                imageService.updateProfileImage(
                        userId,
                        image,
                        userEntity.getImageId() != null && userEntity.getImageId() > 0 ? userEntity.getImageId() : 0
                ).getBody();

        userEntity.setImageId(newImage.getImageId());
        var updatedUser = repository.save(userEntity);

        return UserResponse.builder()
                .userId(updatedUser.getUserId())
                .name(updatedUser.getName())
                .surname(updatedUser.getSurname())
                .email(updatedUser.getEmail())
                .phoneNumber(updatedUser.getPhoneNumber())
                .socialStratum(updatedUser.getSocialStratum() != null ? updatedUser.getSocialStratum() : 0)
                .inHomeAvailableSpace(updatedUser.getInHomeAvailableSpace() != null ? updatedUser.getInHomeAvailableSpace() : 0)
                .profession(updatedUser.getProfession())
                .ownHome(updatedUser.getOwnHome() != null ? updatedUser.getOwnHome() : false)
                .hasPet(updatedUser.getHasPet() != null ? updatedUser.getHasPet() : false)
                .birthDate(updatedUser.getBirthDate())
                .health(updatedUser.getHealth() != null ? updatedUser.getHealth() : 'G')
                .build();
    }
}
