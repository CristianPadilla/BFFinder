package com.cpadilla.authservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(SimpleAuthGlobalException.class)
    protected ResponseEntity<ErrorResponse> handleAuthGlobalException(SimpleAuthGlobalException exception, Locale locale) {
        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .code(exception.getCode())
                        .message(exception.getMessage())
                        .build());
    }


    @ExceptionHandler(Exception.class)
    protected ResponseEntity handleException(Exception exception, Locale locale) {// handle general exceptions
        return ResponseEntity
                .internalServerError()
                .body("Error occur in auth service: "+ exception);
    }

}
