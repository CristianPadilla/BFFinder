package com.cpadilla.authservice.exception;

public class InvalidCredentialsException extends SimpleAuthGlobalException {

    public InvalidCredentialsException() {// DEFAULT EXCEPTION
        super("Wrong credentials, please check them", GlobalErrorCode.INVALID_CREDENTIALS);
    }


    public InvalidCredentialsException(String message) {// DEFAULT EXCEPTION
        super(message, GlobalErrorCode.INVALID_CREDENTIALS);
    }

    public InvalidCredentialsException(String message, String details) {
        super(message, GlobalErrorCode.INVALID_CREDENTIALS, details);
    }
}
