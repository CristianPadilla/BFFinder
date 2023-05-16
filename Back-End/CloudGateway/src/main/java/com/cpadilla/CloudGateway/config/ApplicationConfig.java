package com.cpadilla.CloudGateway.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//    @Autowired
//    com.cpadilla.CloudGateway.service.UserDetailsService userDetailsService;

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return username -> userDetailsService.getUserCredentialsByEmail(username).share().block();
//    }

//    @Bean
//    public ReactiveUserDetailsService userDetailsService() {
//        return username -> Mono.just(userDetailsService.getUserCredentialsByEmail(username).share().block());
//    }

//    @Bean
//    public ReactiveAuthenticationManager authenticationManager() {
//        UserDetailsRepositoryReactiveAuthenticationManager authenticationManager =
//                new UserDetailsRepositoryReactiveAuthenticationManager();
//
//        authenticationManager.setPasswordEncoder(passwordEncoder());
//        authenticationManager.setUserDetailsPasswordService();
//
//        return authenticationManager;
//    }

//    @Bean
//    public UserDetailsRepositoryReactiveAuthenticationManager authenticationManager() {
//        UserDetailsRepositoryReactiveAuthenticationManager manager =
//                new UserDetailsRepositoryReactiveAuthenticationManager(userDetailsService());
//        manager.setPasswordEncoder(passwordEncoder());
//        return manager;
//    }
//
//    private PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

//    @Bean
//    public MapReactiveUserDetailsService userDetailsService() {
//        SecurityProperties.User user = properties.getUser();
//        List<String> roles = user.getRoles();
//        String password = user.getPassword();
//        if (user.isPasswordGenerated()) {
//            log.info(String.format("%n%nUsing default security password: %s%n", user.getPassword()));
//        }
//        final UserDetails userDetails = userDetailsService();
//        return new MapReactiveUserDetailsService(userDetails);
//    }


}
