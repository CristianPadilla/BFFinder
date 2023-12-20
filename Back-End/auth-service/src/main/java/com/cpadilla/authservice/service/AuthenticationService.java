package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserEntity;
import com.cpadilla.authservice.exception.BadRegistrationRequestException;
import com.cpadilla.authservice.exception.UserAlreadyExistException;
import com.cpadilla.authservice.exception.InvalidCredentialsException;
import com.cpadilla.authservice.external.client.LocationService;
import com.cpadilla.authservice.model.*;
import com.cpadilla.authservice.repository.UserCredentialsRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Service
@Log4j2
public class AuthenticationService {

    @Autowired
    private UserCredentialsRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LocationService locationService;


    public void register(UserRegisterRequest request) {

        if (request == null // provitional validation
                || request.getEmail() == null || request.getEmail().isBlank() || request.getEmail().isEmpty()
                || request.getFirstname() == null || request.getFirstname().isBlank() || request.getFirstname().isEmpty()
                || request.getLastname() == null || request.getLastname().isBlank() || request.getLastname().isEmpty()
                || request.getPassword() == null || request.getPassword().isBlank() || request.getPassword().isEmpty()
        ) throw new BadRegistrationRequestException();

        if (repository.findByEmail(request.getEmail()).isPresent())
            throw new UserAlreadyExistException("User with email " + request.getEmail() + " is already registered");

        var user = UserEntity.builder()
                .name(request.getFirstname())
                .surname(request.getLastname())
                .email(request.getEmail())
                .role('u')
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);
    }

    public void registerShelter(ShelterRegisterRequest request) {

        if (request == null // provitional validation
                || request.getEmail() == null || request.getEmail().isBlank() || request.getEmail().isEmpty()
                || request.getName() == null || request.getName().isBlank() || request.getName().isEmpty()
                || request.getNit() == null || request.getNit().isBlank() || request.getNit().isEmpty()
                || request.getPassword() == null || request.getPassword().isBlank() || request.getPassword().isEmpty()
        ) throw new BadRegistrationRequestException();

        if (repository.findByEmail(request.getEmail()).isPresent())
            throw new UserAlreadyExistException("Shelter with email " + request.getEmail() + " is already registered");

        var user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .role('s')
                .nit(request.getNit())
                .comercialRegistrationNumber(request.getComercialRegistrationNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {

            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            if (authenticate.isAuthenticated()) {
                var user = repository.findByEmail(
                                request.getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getUsername()));
                var jwtToken = jwtService.generateToken(CustomUserDetails.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .build());
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
            } else {
                throw new RuntimeException("invalid access");
            }

        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Wrong credentials for email: " + request.getUsername());
        }
    }


}
