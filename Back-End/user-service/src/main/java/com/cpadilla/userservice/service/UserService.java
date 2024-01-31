package com.cpadilla.userservice.service;

import com.cpadilla.userservice.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {

//    long saveUser(UserRequest user);// responsability is now of auth service

    UserResponse getUserById(long userId);

    List<ShelterUserProfilePartialsResponse> findSheltersPartialsProfiles();

    UserCredentialsResponse getUserCredentialsByEmail(String email);

    UserCredentialsResponse getUserCredentialsById(long userId);

    UserResponse updateProfileImage(long userId, MultipartFile image);

    UserResponse enableShelterUser(long userId);
    UserResponse disableShelterUser(long userId);

    List<UserResponse> findPendingShelterUsers();


}
