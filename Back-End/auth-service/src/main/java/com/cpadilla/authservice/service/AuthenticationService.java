package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import com.cpadilla.authservice.exception.BadRegistrationRequestException;
import com.cpadilla.authservice.exception.UserAlreadyExistException;
import com.cpadilla.authservice.exception.InvalidCredentialsException;
import com.cpadilla.authservice.model.AuthenticationRequest;
import com.cpadilla.authservice.model.AuthenticationResponse;
import com.cpadilla.authservice.model.CustomUserDetails;
import com.cpadilla.authservice.model.RegisterRequest;
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


    public AuthenticationResponse register(RegisterRequest request) {

        if (request == null) throw new BadRegistrationRequestException();

        if (repository.findByEmail(request.getEmail()).isPresent())
            throw new UserAlreadyExistException("User with email " + request.getEmail() + " is already registered");

        var user = UserCredentialsEntity.builder()
                .name(request.getFirstname())
                .surname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(CustomUserDetails.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .build());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
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
