package com.cpadilla.authservice.exception;

public class UserNotFoundException extends SimpleAuthGlobalException {

    public UserNotFoundException() {// DEFAULT EXCEPTION
        super("User with provided info not found", GlobalErrorCode.ERROR_USER_NOT_FOUND);
    }

    public UserNotFoundException(String message) {
        super(message, GlobalErrorCode.ERROR_USER_NOT_FOUND);
    }
}
