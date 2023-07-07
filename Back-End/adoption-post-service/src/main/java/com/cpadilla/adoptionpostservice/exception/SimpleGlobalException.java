package com.cpadilla.adoptionpostservice.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleGlobalException extends RuntimeException {

    private String message;
    private String code;
    private String timestamp;
    private String details;


    public SimpleGlobalException(String message) {
        super(message);
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }

    public SimpleGlobalException(String message, String code) {
        this.message = message;
        this.code = code;
    }

    public SimpleGlobalException(String message, String code, String details) {
        this.message = message;
        this.code = code;
        this.details = details;
    }

}
