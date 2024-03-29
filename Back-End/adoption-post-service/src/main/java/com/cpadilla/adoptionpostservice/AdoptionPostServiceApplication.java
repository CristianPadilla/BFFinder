package com.cpadilla.adoptionpostservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AdoptionPostServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdoptionPostServiceApplication.class, args);
	}

}
