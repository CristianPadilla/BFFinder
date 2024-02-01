package com.cpadilla.userservice.service;

import com.cpadilla.userservice.entity.UserEntity;
import com.cpadilla.userservice.exception.UnsupportedFileException;
import com.cpadilla.userservice.exception.UserServiceCustomException;
import com.cpadilla.userservice.external.client.ImageService;
import com.cpadilla.userservice.external.client.LocationService;
import com.cpadilla.userservice.model.*;
import com.cpadilla.userservice.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ImageService imageService;


    @Autowired
    private LocationService locationService;

    public static final List<String> allowedImageFormats = Arrays.asList("jpg", "png", "jpeg");

    @Override
    public UserResponse getUserById(long userId) {
        log.info("from service layer: getting user by id {}", userId);
        UserEntity userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));

        var profileImage =
                userEntity.getImageId() != null
                        ? imageService.getImageById(userEntity.getImageId()).getBody()
                        : null;

        var location = userEntity.getAddressId() != null
                ? locationService.getById(userEntity.getAddressId()).getBody()
                : null;
        if (userEntity.getRole() == 'u') {
            return UserProfileResponse.builder()
                    .userId(userEntity.getUserId())
                    .name(userEntity.getName())
                    .surname(userEntity.getSurname())
                    .email(userEntity.getEmail())
                    .phoneNumber(userEntity.getPhoneNumber())
                    .profileImageUrl(profileImage != (null) ? profileImage.getImageUrl() : null)
                    .role(userEntity.getRole())
                    .location(location)
                    .build();
        } else if (userEntity.getRole() == 's') {

            return ShelterUserProfileResponse.builder()
                    .userId(userEntity.getUserId())
                    .name(userEntity.getName())
                    .description(userEntity.getDescription())
                    .email(userEntity.getEmail())
                    .phoneNumber(userEntity.getPhoneNumber())
                    .profileImageUrl(profileImage != (null) ? profileImage.getImageUrl() : null)
                    .location(location)
                    .role(userEntity.getRole())
                    .nit(userEntity.getNit())
                    .webPageUrl(userEntity.getWebPageUrl())
                    .commercialRegistrationNumber(userEntity.getCommercialRegistrationNumber())
                    .build();
        } else if (userEntity.getRole() == 'a') {

            return UserProfileResponse.builder()
                    .userId(userEntity.getUserId())
                    .name(userEntity.getName())
                    .email(userEntity.getEmail())
                    .role(userEntity.getRole())
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
    public List<ShelterUserProfilePartialsResponse> findSheltersPartialsProfiles() {
        var shelters = repository.findAllByRoleOrderByBirthDate(Character.valueOf('s'));
//        log.info("USUARIOSSSSS {}", shelters);

        return shelters.stream().map(userEntity -> {
                    var profileImage =
                            userEntity.getImageId() != null
                                    ? imageService.getImageById(userEntity.getImageId()).getBody().getImageUrl()
                                    : null;

                    return ShelterUserProfilePartialsResponse.builder()
                            .id(userEntity.getUserId())
                            .name(userEntity.getName())
                            .profileImageUrl(profileImage)
                            .build();
                }
        ).collect(Collectors.toList());
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

        var filename = image.getOriginalFilename();
        var extension = filename.substring(filename.lastIndexOf(".") + 1);
        if (!allowedImageFormats.contains(extension)) {
            throw new UnsupportedFileException("The file type/extension is invalid, try a valid image file (png, jpg, jpeg)");
        }

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
                    .role('s')
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
                    .role('s')
                    .build();
        } else throw new UserServiceCustomException("user role is not valid", "ROLE_NOT_VALID");
    }

    @Override
    public UserResponse enableShelterUser(long userId) {
        log.info("enabling shelter user with id: {} from service layer", userId);
        var userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));
        userEntity.setShelterEnabled('e');
        var updatedUser = repository.save(userEntity);

        return buildShelterUserAdminProfileResponse(updatedUser);
    }

    @Override
    public UserResponse disableShelterUser(long userId) {
        log.info("disabling shelter user with id: {} from service layer", userId);
        var userEntity = repository.findById(userId)
                .orElseThrow(() -> new UserServiceCustomException("user with given id not found", "USER_NOT_FOUND"));
        userEntity.setShelterEnabled('d');
        var updatedUser = repository.save(userEntity);

        return buildShelterUserAdminProfileResponse(updatedUser);


    }

    @Override
    public List<UserResponse> findPendingShelterUsers() {
        log.info("getting pending shelter users from service layer");
        var users = repository.findAllByRoleAndAndShelterEnabled('s', 'p');

        return users.stream().map(this::buildShelterUserAdminProfileResponse).collect(Collectors.toList());
    }

    public ShelterUserProfileResponse buildShelterUserAdminProfileResponse(UserEntity userEntity) {
        var profileImage =
                userEntity.getImageId() != null
                        ? imageService.getImageById(userEntity.getImageId()).getBody().getImageUrl()
                        : null;

        return ShelterUserProfileResponse.builder()
                .userId(userEntity.getUserId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .phoneNumber(userEntity.getPhoneNumber())
                .commercialRegistrationNumber(userEntity.getCommercialRegistrationNumber())
                .nit(userEntity.getNit())
                .profileImageUrl(profileImage)
                .shelterEnabled(userEntity.getShelterEnabled())
                .role('s')
                .build();
    }


}
