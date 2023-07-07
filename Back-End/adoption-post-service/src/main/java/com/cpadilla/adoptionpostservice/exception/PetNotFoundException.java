package com.cpadilla.adoptionpostservice.exception;

public class PetNotFoundException extends SimpleGlobalException {

    public PetNotFoundException() {
        super("No pet were found", GlobalErrorCode.ERROR_PET_NOT_FOUND);
    }


    public PetNotFoundException(String message) {
        super(message, GlobalErrorCode.ERROR_PET_NOT_FOUND);
    }

    public PetNotFoundException(String message, String details) {
        super(message, GlobalErrorCode.ERROR_PET_NOT_FOUND, details);
    }
}
