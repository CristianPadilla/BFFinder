package com.cpadilla.adoptionpostservice.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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


    @ExceptionHandler(SimpleGlobalException.class)
    protected ResponseEntity<ErrorResponse> handleAuthGlobalException(SimpleGlobalException exception, Locale locale) {
        log.info("Handling exception from adoption post service");
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder()
                        .code(exception.getCode())
                        .message(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build());
    }

    @ExceptionHandler({CustomException.class})
    protected ResponseEntity<ErrorResponse> handleException(CustomException exception, Locale locale) {// handle general exceptions
        log.info("Handling general custom exception from adoption post service  {}", exception.getMessage());
        return ResponseEntity
                .status(HttpStatusCode.valueOf(exception.getStatus()))
                .body(ErrorResponse.builder()
                        .message("Error occur in adoption post service")
                        .details(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build());
    }

    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleException(Exception exception, Locale locale) {// handle general exceptions
        log.info("Handling general exception from adoption post service  {}", exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity
                .internalServerError()
                .body(ErrorResponse.builder()
                        .message("Error occur in adoption post service")
                        .details(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build());
    }


}
