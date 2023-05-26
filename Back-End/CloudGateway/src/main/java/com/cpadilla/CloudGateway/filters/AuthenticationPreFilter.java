//package com.cpadilla.CloudGateway.filters;
//
//import com.cpadilla.CloudGateway.model.Authorities;
//import com.cpadilla.CloudGateway.model.ConnValidationResponse;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.NoArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
//import org.springframework.core.io.buffer.DataBufferFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.http.server.reactive.ServerHttpResponse;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.reactive.function.client.WebClientResponseException;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//import java.util.Date;
//import java.util.List;
//import java.util.function.Predicate;
//
//@Component
//@Slf4j
//public class AuthenticationPreFilter extends AbstractGatewayFilterFactory<AuthenticationPreFilter.Config> {
//
//    @Autowired
//    @Qualifier("excludedUrls")
//    List<String> excludedUrls;
//    private final WebClient.Builder webClientBuilder;
//
//    public AuthenticationPreFilter(WebClient.Builder webClientBuilder) {
//        super(Config.class);
//        this.webClientBuilder = webClientBuilder;
//    }
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Override
//    public GatewayFilter apply(Config config) {
//        return (exchange, chain) -> {
//            ServerHttpRequest request = exchange.getRequest();
//            System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
//            log.info("**************************************************************************");
//            log.info("URL is - " + request.getURI().getPath());
//            String bearerToken = request.getHeaders().getFirst("Authorization");
//            log.info("Bearer Token: " + bearerToken);
//
//            if (isSecured.test(request)) {
//                return webClientBuilder.build().get()
//                        .uri("http://localhost:9090/validateToken/1")
//                        .header("Authorization", bearerToken)
//                        .retrieve().bodyToMono(ConnValidationResponse.class)
//                        .map(response -> {
//                            exchange.getRequest().mutate().header("username", response.getUsername());
//                            exchange.getRequest().mutate().header("authorities", response.getAuthorities().stream().map(Authorities::getAuthority).reduce("", (a, b) -> a + "," + b));
//
//                            return exchange;
//                        }).flatMap(chain::filter).onErrorResume(error -> {
//                            log.info("Error Happened");
//                            HttpStatusCode errorCode = null;
//                            String errorMsg = "";
//                            if (error instanceof WebClientResponseException) {
//                                WebClientResponseException webCLientException = (WebClientResponseException) error;
//                                errorCode = webCLientException.getStatusCode();
//                                errorMsg = webCLientException.getStatusText();
//
//                            } else {
//                                errorCode = HttpStatus.BAD_GATEWAY;
//                                errorMsg = HttpStatus.BAD_GATEWAY.getReasonPhrase();
//                            }
////                            AuthorizationFilter.AUTH_FAILED_CODE
//                            return onError(exchange, String.valueOf(errorCode.value()), errorMsg, "JWT Authentication Failed", errorCode);
//                        });
//            }
//
//            return chain.filter(exchange);
//        };
//    }
//
//    public Predicate<ServerHttpRequest> isSecured = request -> excludedUrls.stream().noneMatch(uri -> request.getURI().getPath().contains(uri));
//
//    private Mono<Void> onError(ServerWebExchange exchange, String errCode, String err, String errDetails, HttpStatusCode httpStatus) {
//        DataBufferFactory dataBufferFactory = exchange.getResponse().bufferFactory();
//        ObjectMapper objMapper = new ObjectMapper();
//        ServerHttpResponse response = exchange.getResponse();
//        response.setStatusCode(httpStatus);
//        try {
//            response.getHeaders().add("Content-Type", "application/json");
//            ExceptionResponseModel data = new ExceptionResponseModel(errCode, err, errDetails, new Date());
//            byte[] byteData = objectMapper.writeValueAsBytes(data);
//            return response.writeWith(Mono.just(byteData).map(t -> dataBufferFactory.wrap(t)));
//
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//
//        }
//        return response.setComplete();
//    }
//
//
//    @NoArgsConstructor
//    public static class Config {
//
//
//    }
//}