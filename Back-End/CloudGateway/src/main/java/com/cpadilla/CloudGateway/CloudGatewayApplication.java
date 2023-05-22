package com.cpadilla.CloudGateway;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;


@SpringBootApplication
public class CloudGatewayApplication {



    public static void main(String[] args) {
        SpringApplication.run(CloudGatewayApplication.class, args);
    }


}