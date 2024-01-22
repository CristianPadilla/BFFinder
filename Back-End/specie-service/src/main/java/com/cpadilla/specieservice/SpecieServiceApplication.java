package com.cpadilla.specieservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SpecieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpecieServiceApplication.class, args);
	}

}
