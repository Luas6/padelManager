package com.saul.padelManager.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class ConstantesProyecto {
    public static final String BASE_API_PATH = "/api/v1/";
    public static final String BASE_CORS_PATH = "/api/v1/**";

    public static final int NUMERO_PISTAS = 4;

    public static final List<String> HORAS_DISPONIBLES = Arrays.asList(
            "09:00", "10:30", "12:00", "16:30", "18:00", "19:30", "21:00"
    );

    private static String rutaAngular;

    @Value("${ruta.angular}")
    public void setRutaAngular(String rutaAngular) {
        ConstantesProyecto.rutaAngular = rutaAngular;
    }

    public static String getRutaAngular() {
        return rutaAngular;
    }
}
