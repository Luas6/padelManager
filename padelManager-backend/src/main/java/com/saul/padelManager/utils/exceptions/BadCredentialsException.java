package com.saul.padelManager.utils.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class BadCredentialsException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public BadCredentialsException(String message) {
        super(message);
    }
}
