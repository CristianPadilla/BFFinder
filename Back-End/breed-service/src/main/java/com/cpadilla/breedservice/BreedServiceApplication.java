package com.cpadilla.breedservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BreedServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreedServiceApplication.class, args);
	}

}
