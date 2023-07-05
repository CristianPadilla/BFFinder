package com.cpadilla.CloudGateway.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleGatewayGlobalException extends RuntimeException {

    private String message;
    private String code;
    private String errDetails;

    public SimpleGatewayGlobalException(String message){
        super(message);
    }

}
