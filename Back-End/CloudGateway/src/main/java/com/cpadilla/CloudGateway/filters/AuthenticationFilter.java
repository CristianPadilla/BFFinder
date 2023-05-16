package com.cpadilla.CloudGateway.filters;

import com.cpadilla.CloudGateway.exception.JwtFilterCustomException;
import com.cpadilla.CloudGateway.security.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Component
@Log4j2
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;


//    @Autowired
//    private JwtUtil jwtUtil;

//    @Autowired
//    private RestTemplate restTemplate;

    @Autowired
    private JwtUtil jwtUtil;


    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
            log.info("HOLAAAAAAAAAAAAAAAAAAAAAAAA");
            //Nueva logica de amigoscode
            final String jwt;
            final String userEmail;
            final String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION) != null
                    ? exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0)
                    : null;
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                chain.filter(exchange);// do not know if necessary or not
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "INVALID_AUTHORIZATION_HEADER");
            }
            jwt = authHeader.substring(7);
            userEmail = jwtUtil.extractUsername(jwt);


//            if (validator.isSecured.test(exchange.getRequest())) { //Check if request corresponds to unsecured endpoints
//
//                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {//header contains token or not?
//                    throw new RuntimeException("missing authorization header");
//                }
//                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
//                if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                    authHeader = authHeader.substring(7);
//                }
//                try {//REST call to auth Service (unsafe way to validate token because of service call)
////                    restTemplate.getForObject("http://AUTH-SERVICE/auth/validate?token=" + authHeader, String.class);
//
//                    // a better solution is to add the token validation logic to gateway
//                    jwtUtil.validateToken(authHeader);
//                } catch (Exception e) {
//                    throw new RuntimeException("unauthirized access to application");
//                }


//            }

            return chain.filter(exchange);
        }));
    }

    public static class Config {
    }
}
