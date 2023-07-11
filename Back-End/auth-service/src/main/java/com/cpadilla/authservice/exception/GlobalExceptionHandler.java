package com.cpadilla.authservice.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(SimpleAuthGlobalException.class)
    protected ResponseEntity<ErrorResponse> handleAuthGlobalException(SimpleAuthGlobalException exception, Locale locale) {
        log.info("Handling auth exception from auth service");
        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .code(exception.getCode())
                        .message(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build());
    }


    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleException(Exception exception, Locale locale) {// handle general exceptions
        log.info("Handling general exception from auth service  {}", exception.getClass().toString());
        return ResponseEntity
                .internalServerError()
                .body(ErrorResponse.builder()
                        .message("Error occur in auth service")
                        .details(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build());
//                .body("Error occur in auth service: "+ exception);
    }

}
