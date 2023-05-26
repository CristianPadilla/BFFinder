package com.cpadilla.CloudGateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsConfiguration;// todo momento
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.util.pattern.PathPatternParser;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("*")); // Permite todos los orígenes
        corsConfig.addAllowedMethod("*"); // Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
        corsConfig.addAllowedHeader("*"); // Permite todas las cabeceras
        corsConfig.setAllowCredentials(true); // Permite enviar credenciales (cookies, encabezados de autenticación, etc.)

        CorsConfigurationSource source = exchange -> corsConfig;

        return new CorsWebFilter(source);
    }
}