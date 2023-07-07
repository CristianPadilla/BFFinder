package com.cpadilla.adoptionpostservice.exception;

public class PostNotFoundException extends SimpleGlobalException {

    public PostNotFoundException() {
        super("No adoption post were found", GlobalErrorCode.ERROR_NO_POSTS_FOUND);
    }


    public PostNotFoundException(String message) {
        super(message, GlobalErrorCode.ERROR_NO_POSTS_FOUND);
    }

    public PostNotFoundException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_NO_POSTS_FOUND, details);
    }
}
