package com.cpadilla.petservice.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);

    }

    @ExceptionHandler(UnsupportedFileException.class)
    protected ResponseEntity<Object> handleFileException(UnsupportedFileException exception, WebRequest request) {
        log.info("Handling file exception from pet service");
        return handleExceptionInternal(exception,
                (ErrorResponse.builder()
                        .message("Error occur in pet service")
                        .details(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build()),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

//    @ExceptionHandler(SimpleGlobalException.class)
//    protected ResponseEntity<ErrorResponse> handleAuthGlobalException(SimpleGlobalException exception, Locale locale) {
//        log.info("Handling exception from adoption post service");
//        return ResponseEntity
//                .status(HttpStatus.NOT_FOUND)
//                .body(ErrorResponse.builder()
//                        .code(exception.getCode())
//                        .message(exception.getMessage())
//                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
//                        .build());
//    }


}
