package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import com.cpadilla.authservice.exception.InvalidCredentialsException;
import com.cpadilla.authservice.model.CustomUserDetails;
import com.cpadilla.authservice.repository.UserCredentialsRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserCredentialsRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Looking for a user with username: {}", username);
        Optional<UserCredentialsEntity> credentials = repository.findByEmail(username);
        return credentials.map(CustomUserDetails::new).orElseThrow(() -> new InvalidCredentialsException("user not found with email: " + username));

    }
}
