package com.saul.padelManager.utils.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UsuarioConflictException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public UsuarioConflictException(String message) {
        super(message);
    }
}
