package com.cpadilla.CloudGateway.exception;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.result.method.annotation.ResponseEntityExceptionHandler;

import java.util.Locale;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(SimpleGatewayGlobalException.class)
    protected ResponseEntity<ErrorResponse> handleAuthGlobalException(SimpleGatewayGlobalException exception, Locale locale) {
        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .code(exception.getCode())
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    protected ResponseEntity<ErrorResponse> handleJwtException(ExpiredJwtException exception, Locale locale) {
       log.info("================================HOLAAA");
        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .code(GlobalErrorCode.ERROR_TOKEN_EXPIRED)
                        .message(exception.getMessage())
                        .build());
    }


    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleException(Exception exception, Locale locale) {// handle general exceptions
        return ResponseEntity
                .internalServerError()
                .body("Error occur in auth service: "+ exception);
    }

}
