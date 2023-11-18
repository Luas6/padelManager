package com.saul.padelManager.utils;

import com.saul.padelManager.utils.exceptions.CampoRequeridoException;

public class FuncionesUtil {
    public static <T> void comprobarNotNull(T value) {
        if (value == null || value instanceof String && ((String) value).isEmpty()) {
            throw new CampoRequeridoException("Faltan campos en la solicitud");
        }
    }
}
