package com.cpadilla.authservice.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleAuthGlobalException extends RuntimeException {

    private String message;
    private String code;

    public SimpleAuthGlobalException(String message){
        super(message);
    }

}
