package com.cpadilla.CloudGateway.filters;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class ExceptionResponseModel {

    private String errCode;
    private String err;
    private String errDetails;
    private Date date;

}
