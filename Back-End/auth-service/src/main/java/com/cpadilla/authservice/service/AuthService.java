package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import com.cpadilla.authservice.model.AuthenticationResponse;
import com.cpadilla.authservice.model.RegisterRequest;
import com.cpadilla.authservice.model.UserCredentialsResponse;
import com.cpadilla.authservice.repository.UserCredentialsRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class AuthService {

    @Autowired
    private UserCredentialsRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


//    public

    public String register(RegisterRequest request) {

        var savedUser = repository.save(UserCredentialsEntity.builder()
                .name(request.getFirstname())
                .surname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build());

        log.info("Saving user with id = {} from auth service layer", savedUser.getId());
        return "user added to the sistem";
//        var jwtToken = jwtService.generateToken(savedUser);


//        var token = jwtService.generateToken(savedUser);
//        saveUserToken(savedUser, jwtToken);
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                .refreshToken(refreshToken)
//                .build();
    }

    public String generateToken(UserCredentialsResponse request) {
        return jwtService.generateToken(Use);
    }


//    private void saveUserToken(UserCredentialsEntity user, String jwtToken) {
//        var token = Token.builder()
//                .user(user)
//                .token(jwtToken)
//                .tokenType(TokenType.BEARER)
//                .expired(false)
//                .revoked(false)
//                .build();
//        tokenRepository.save(token);
//    }
}
