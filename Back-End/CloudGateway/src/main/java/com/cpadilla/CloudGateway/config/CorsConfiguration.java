package com.cpadilla.CloudGateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.reactive.CorsConfiguration;// todo momento
import org.springframework.web.cors.reactive.CorsWebFilter;

import java.util.Arrays;

import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfiguration extends org.springframework.web.cors.CorsConfiguration {


    @Bean
    public CorsWebFilter corsFilter() {
        org.springframework.web.cors.CorsConfiguration corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
//        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
//        corsConfiguration.setAllowedHeaders();
        corsConfiguration.addAllowedHeader("*");
//        corsConfiguration.addAllowedHeader("content-type");
//        corsConfiguration.addAllowedHeader("accept");
//        corsConfiguration.addAllowedHeader("authorization");
//        corsConfiguration.addAllowedHeader("cookie");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsWebFilter(source);
    }
}