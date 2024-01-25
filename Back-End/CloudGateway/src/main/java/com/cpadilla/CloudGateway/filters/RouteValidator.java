package com.cpadilla.CloudGateway.filters;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.List;
import java.util.function.Predicate;

@Component
@Log4j2
public class RouteValidator {

    // list of endpoints that will be allowed by the gateway
    public static final List<String> openApiEndpoints = List.of(
            "/auth/register",
            "/auth/register/shelter",
            "/auth/authenticate",
            "/eureka",
            "/post/all/sort/date/true",
            "/user/all/shelters"
//            "/api-docts/",
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> new AntPathMatcher().match(uri, request.getURI().getPath()));
    ;


}
