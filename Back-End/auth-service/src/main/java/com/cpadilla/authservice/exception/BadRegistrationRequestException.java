package com.cpadilla.authservice.exception;

public class BadRegistrationRequestException extends SimpleAuthGlobalException {

    public BadRegistrationRequestException() {// DEFAULT EXCEPTION
        super("Provided info for registration is not valid", GlobalErrorCode.ERROR_BAD_REGISTRATION_REQUEST);
    }

    public BadRegistrationRequestException(String message) {
        super(message, GlobalErrorCode.ERROR_BAD_REGISTRATION_REQUEST);
    }
}
