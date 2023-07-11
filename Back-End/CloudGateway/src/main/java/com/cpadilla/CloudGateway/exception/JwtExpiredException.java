package com.cpadilla.CloudGateway.exception;

public class JwtExpiredException extends SimpleGatewayGlobalException {

    public JwtExpiredException() {// DEFAULT EXCEPTION
        super("Token has expired", GlobalErrorCode.ERROR_TOKEN_EXPIRED, "Token has expired, generate a new one");
    }

    public JwtExpiredException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_TOKEN_EXPIRED, details);
    }
}
