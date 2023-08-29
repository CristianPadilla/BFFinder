package com.cpadilla.CloudGateway.filters;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    // list of endpoints that will be allowed by the gateway
    public static final List<String> openApiEndpoints = List.of(
            "/auth/register",
            "/auth/register/shelter",
            "/auth/authenticate",
            "/eureka"
//            "/api-docts/",
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
