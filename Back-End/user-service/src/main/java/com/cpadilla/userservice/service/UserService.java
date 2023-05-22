package com.cpadilla.userservice.service;

import com.cpadilla.userservice.model.UserCredentialsResponse;
import com.cpadilla.userservice.model.UserRequest;
import com.cpadilla.userservice.model.UserResponse;


public interface UserService {

    long saveUser(UserRequest user);

    UserResponse getUserById(long userId);

    UserCredentialsResponse getUserCredentialsByEmail(String email);

    UserCredentialsResponse getUserCredentialsById(long userId);


}
