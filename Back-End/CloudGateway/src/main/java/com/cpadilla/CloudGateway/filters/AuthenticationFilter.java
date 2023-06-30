package com.cpadilla.CloudGateway.filters;

import com.cpadilla.CloudGateway.security.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@Log4j2
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;


    @Autowired
    private JwtUtil jwtUtil;


    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) { //Check if request corresponds to unsecured endpoints
                final String jwt;
                final String userEmail;
                final String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION) != null ?
                        exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0) :
                        null;
                log.info("hola1 XX Validating token: ");
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "INVALID_AUTHORIZATION_HEADER");
                }
                log.info("hola2 XX Validating token: ");
                jwt = authHeader.substring(7);
                log.info("hola3 XX Validating token: ");
                userEmail = jwtUtil.extractUsername(jwt);
                log.info("hola4 XX Validating token: ");

                try {
                    log.info("hola5 XX Validating token: ");
                    //REST call to auth Service (unsafe way to validate token because of service call)
                    //restTemplate.getForObject("http://AUTH-SERVICE/auth/validate?token=" + authHeader, String.class);

                    // a better solution is to add the token validation logic to gateway
                    log.info("XX Validating token: ");
                    System.out.println("XX Validating token: ");
                    jwtUtil.validateToken(jwt);
                } catch (Exception e) {
                    throw new RuntimeException("unauthorized access to application");
                }
            }


            return chain.filter(exchange);
        }));
    }

    public static class Config {
    }
}
