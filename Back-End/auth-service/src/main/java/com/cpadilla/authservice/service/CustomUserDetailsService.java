package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import com.cpadilla.authservice.model.CustomUserDetails;
import com.cpadilla.authservice.repository.UserCredentialsRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.stream.Stream;

@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserCredentialsRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserCredentialsEntity> credentials = repository.findByEmail(username);
        return credentials.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + username));


//        Optional<UserCredentialsEntity> credentials = repository.findByEmail(username);
//        var credenciales = credentials.map(CustomUserDetails::new);
//        String nombre = credentials.map(UserCredentialsEntity::getEmail).orElse("j");
//        log.info("===========credenciales {}", credenciales.getClass());
//        var respuesta = credenciales.orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + username));
//        log.info("===========respuesta {}", respuesta.getClass());
//        return respuesta;
    }
}
