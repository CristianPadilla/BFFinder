package com.cpadilla.imagesservice.exception;

import lombok.Data;

@Data
public class ImageServiceCustomException extends RuntimeException {

    private String errorCode;

    public ImageServiceCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
