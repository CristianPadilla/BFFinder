package com.cpadilla.CloudGateway.exception;

public class InvalidJwtException extends SimpleGatewayGlobalException {

    public InvalidJwtException() {// DEFAULT EXCEPTION
        super("Sent token is invalid", GlobalErrorCode.ERROR_TOKEN_INVALID, "Sent token is invalid, generate a new one or check your credentials");
    }

    public InvalidJwtException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_TOKEN_INVALID, details);
    }
}
