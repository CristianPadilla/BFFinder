package com.cpadilla.userservice.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UnsupportedFileException.class)
    protected ResponseEntity<Object> handleFileException(UnsupportedFileException exception, WebRequest request) {
        log.info("Handling file exception from user service");
        return handleExceptionInternal(exception,
                (ErrorResponse.builder()
                        .message("Error occur in adoption post service")
                        .details(exception.getMessage())
                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
                        .build()),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

//    @ExceptionHandler({Exception.class})
//    protected ResponseEntity handleException(Exception exception, Locale locale) {// handle general exceptions
//        log.info("Handling general exception from adoption post service  {}", exception.getMessage());
//        exception.printStackTrace();
//        return ResponseEntity
//                .internalServerError()
//                .body(ErrorResponse.builder()
//                        .message("Error occur in adoption post service")
//                        .details(exception.getMessage())
//                        .timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME))
//                        .build());
//    }


}
