//package com.cpadilla.CloudGateway.config;
//
//import com.cpadilla.CloudGateway.filters.AuthenticationPreFilter;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class RouteConfiguration {
//
////    @Bean
////    public RouteLocator routes(
////            RouteLocatorBuilder builder,
////            AuthenticationPreFilter authFilter) {
////        return builder.routes()
////                .route("auth-service-route", r -> r.path("/authentication-service/**")
////                        .filters(f ->
////                                f.rewritePath("/authentication-service(?<segment>/?.*)", "$\\{segment}")
////                                        .filter(authFilter.apply(
////                                                new AuthenticationPreFilter.Config())))
////                        .uri("lb://AUTH-SERVICE"))
////                .route("user-service-route", r -> r.path("/user-service/**")
////                        .filters(f ->
////                                f.rewritePath("/user-service(?<segment>/?.*)", "$\\{segment}")
////                                        .filter(authFilter.apply(
////                                                new AuthenticationPreFilter.Config())))
////                        .uri("lb://AUTH-SERVICE"))
////                .build();
////    }
//
//}
