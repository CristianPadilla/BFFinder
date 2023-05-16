package com.cpadilla.CloudGateway.filters;

import com.cpadilla.CloudGateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

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

            if (validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not?
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }
                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {//REST call to auth Service (unsafe way to validate token because of service call)
//                    restTemplate.getForObject("http://AUTH-SERVICE/auth/validate?token=" + authHeader, String.class);

                    // a better solution is to add the token validation logic to gateway
                    jwtUtil.validateToken(authHeader);
                } catch (Exception e) {
                    throw new RuntimeException("unauthirized access to application");
                }


            }

            return chain.filter(exchange);
        }));
    }

    public static class Config {
    }
}
