package com.cpadilla.authservice.exception;

public class UserAlreadyExistException extends SimpleAuthGlobalException{

    public UserAlreadyExistException() {// DEFAULT EXCEPTION
        super("User with provided info already exist", GlobalErrorCode.ERROR_USER_ALREADY_EXIST);
    }

    public UserAlreadyExistException(String message) {
        super(message, GlobalErrorCode.ERROR_USER_NOT_FOUND);
    }
}
