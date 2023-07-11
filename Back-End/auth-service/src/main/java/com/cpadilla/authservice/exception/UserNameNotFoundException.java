package com.cpadilla.authservice.exception;

public class UserNameNotFoundException extends SimpleAuthGlobalException {

    public UserNameNotFoundException() {
        super("Username not found in the system", GlobalErrorCode.ERROR_USER_NOT_FOUND);
    }


    public UserNameNotFoundException(String message) {// DEFAULT EXCEPTION
        super(message, GlobalErrorCode.ERROR_USER_NOT_FOUND);
    }

    public UserNameNotFoundException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_USER_NOT_FOUND, details);
    }
}
