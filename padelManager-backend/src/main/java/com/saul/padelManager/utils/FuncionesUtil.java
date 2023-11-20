package com.saul.padelManager.utils;

import com.saul.padelManager.utils.exceptions.CampoRequeridoException;
import com.saul.padelManager.utils.exceptions.InvalidFormatException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class FuncionesUtil {
    public static <T> void comprobarNotNull(T value) {
        if (value == null || value instanceof String && ((String) value).isEmpty()) {
            throw new CampoRequeridoException("Faltan campos en la solicitud");
        }
    }

    public static void esFechaValida(String fecha) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        comprobarNotNull(fecha);
        try {
            LocalDate.parse(fecha, formatter);
        } catch (DateTimeParseException e) {
           throw new InvalidFormatException("Fecha no Válida");
        }
    }

    public static void esHoraValida(String hora) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        comprobarNotNull(hora);
        if(!ConstantesProyecto.HORAS_DISPONIBLES.contains(hora)){
            throw new InvalidFormatException("Hora no válida");
        }
    }

    public static void esPistaValida(int numeroPista) {
        comprobarNotNull(numeroPista);
        if(numeroPista > ConstantesProyecto.NUMERO_PISTAS || numeroPista < 1 ){
            throw new InvalidFormatException("Pista no válida");
        }
    }
}
