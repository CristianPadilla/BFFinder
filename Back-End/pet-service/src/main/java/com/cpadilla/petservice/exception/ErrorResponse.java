package com.cpadilla.petservice.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private String code;
    private String message;
    private String details;
    private String timestamp;

}
