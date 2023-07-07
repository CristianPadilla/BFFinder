package com.cpadilla.adoptionpostservice.exception;

public class NoPostsFoundException extends SimpleGlobalException {

    public NoPostsFoundException() {
        super("No adoption post were found", GlobalErrorCode.ERROR_NO_POSTS_FOUND);
    }


    public NoPostsFoundException(String message) {
        super(message, GlobalErrorCode.ERROR_NO_POSTS_FOUND);
    }

    public NoPostsFoundException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_NO_POSTS_FOUND, details);
    }
}
