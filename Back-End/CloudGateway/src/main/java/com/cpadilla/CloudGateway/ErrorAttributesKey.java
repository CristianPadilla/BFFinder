package com.cpadilla.CloudGateway;

import lombok.Getter;

@Getter
public enum ErrorAttributesKey {
    CODE("code"),
    MESSAGE("message"),

    DETAILS("details"),
    TIME("timestamp"),
    STATUS_CODE("status_code");


    private final String key;

    ErrorAttributesKey(String key) {
        this.key = key;
    }
}
