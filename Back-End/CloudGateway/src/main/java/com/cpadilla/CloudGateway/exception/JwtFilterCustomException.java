package com.cpadilla.CloudGateway.exception;

import lombok.Data;

@Data
public class JwtFilterCustomException extends RuntimeException {

    private String errorCode;

    public JwtFilterCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
