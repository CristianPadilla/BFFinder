package com.cpadilla.CloudGateway.exception;

public class JwtExpiredException extends SimpleGatewayGlobalException {

    public JwtExpiredException() {// DEFAULT EXCEPTION
        super("Token has expired", GlobalErrorCode.ERROR_TOKEN_EXPIRED);
    }

    public JwtExpiredException(String message) {
        super(message, GlobalErrorCode.ERROR_TOKEN_EXPIRED);
    }
}
