package com.cpadilla.userservice.service;

import com.cpadilla.userservice.entity.UserEntity;
import com.cpadilla.userservice.exception.UserServiceCustomException;
import com.cpadilla.userservice.external.client.ImageService;
import com.cpadilla.userservice.external.client.LocationService;
import com.cpadilla.userservice.model.*;
import com.cpadilla.userservice.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.ZoneId;

@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ImageService imageService;


    @Autowired
    private LocationService locationService;

    @Override
    public UserResponse getUserById(long userId) {
        log.info("from service layer: getting user by id {}", userId);
        UserEntity userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        var profileImage =
                userEntity.getImageId() != null
                        ? imageService.getImageById(userEntity.getImageId()).getBody()
                        : null;

        if (userEntity.getRole() == 'u') {
            return UserProfileResponse.builder()
                    .userId(userEntity.getUserId())
                    .name(userEntity.getName())
                    .surname(userEntity.getSurname())
                    .email(userEntity.getEmail())
                    .phoneNumber(userEntity.getPhoneNumber())
                    .profileImageUrl(profileImage != (null) ? profileImage.getImageUrl() : null)
                    .build();
        } else if (userEntity.getRole() == 's') {
            var location = locationService.getById(userEntity.getAddressId()).getBody();
            return ShelterUserProfileResponse.builder()
                    .userId(userEntity.getUserId())
                    .name(userEntity.getName())
                    .email(userEntity.getEmail())
                    .phoneNumber(userEntity.getPhoneNumber())
                    .profileImageUrl(profileImage != (null) ? profileImage.getImageUrl() : null)
                    .location(location)
                    .build();
        } else throw new UserServiceCustomException("user role is not valid", "ROLE_NOT_VALID");


//        return UserProfileResponse.builder().userId(userEntity.getUserId())
//                .name(userEntity.getName())
//                .surname(userEntity.getSurname())
//                .email(userEntity.getEmail())
//                .phoneNumber(userEntity.getPhoneNumber())
////                .socialStratum(userEntity.getSocialStratum() != null ? userEntity.getSocialStratum() : 0)
////                .inHomeAvailableSpace(userEntity.getInHomeAvailableSpace() != null ? userEntity.getInHomeAvailableSpace() : 0)
////                .profession(userEntity.getProfession())
////                .ownHome(userEntity.getOwnHome() != null ? userEntity.getOwnHome() : false)
////                .hasPet(userEntity.getHasPet() != null ? userEntity.getHasPet() : false)
//                .birthDate(userEntity.getBirthDate())
////                .health(userEntity.getHealth() != null ? userEntity.getHealth() : 'G')
//                .build();

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
    public UserResponse updateProfileImage(long userId, MultipartFile image) {// if want to delete, just do not send an image

        log.info("updating profile photo for user with id: {} from service layer", userId);
        var userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        ImageResponse newImage;
        if (image == null || image.isEmpty()) {
            newImage = null;
            userEntity.setImageId(null);
        } else {
            newImage =
                    imageService.updateProfileImage(
                            userId,
                            image,
                            userEntity.getImageId() != null && userEntity.getImageId() > 0 ? userEntity.getImageId() : 0
                    ).getBody();
            userEntity.setImageId(newImage.getImageId());
        }
        var updatedUser = repository.save(userEntity);

        if (updatedUser.getRole() == 'u') {
            return UserProfileResponse.builder()
                    .userId(updatedUser.getUserId())
                    .name(updatedUser.getName())
                    .surname(updatedUser.getSurname())
                    .email(updatedUser.getEmail())
                    .phoneNumber(updatedUser.getPhoneNumber())
                    .profileImageUrl(newImage != null ? newImage.getImageUrl() : null)
                    .build();
        } else if (updatedUser.getRole() == 's') {
            var location = locationService.getById(updatedUser.getAddressId()).getBody();
            return ShelterUserProfileResponse.builder()
                    .userId(updatedUser.getUserId())
                    .name(updatedUser.getName())
                    .email(updatedUser.getEmail())
                    .phoneNumber(updatedUser.getPhoneNumber())
                    .profileImageUrl(newImage != null ? newImage.getImageUrl() : null)
                    .location(location)
                    .build();
        } else throw new UserServiceCustomException("user role is not valid", "ROLE_NOT_VALID");
    }
}
