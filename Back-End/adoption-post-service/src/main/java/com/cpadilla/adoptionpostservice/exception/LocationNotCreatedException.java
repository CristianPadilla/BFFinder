package com.cpadilla.adoptionpostservice.exception;

public class LocationNotCreatedException extends SimpleGlobalException {

    public LocationNotCreatedException() {
        super("No pet were found", GlobalErrorCode.LOCATION_NOT_CREATED);
    }

    public LocationNotCreatedException(String message) {
        super(message, GlobalErrorCode.LOCATION_NOT_CREATED);
    }

    public LocationNotCreatedException(String message, String details) {
        super(message, GlobalErrorCode.LOCATION_NOT_CREATED, details);
    }
}
