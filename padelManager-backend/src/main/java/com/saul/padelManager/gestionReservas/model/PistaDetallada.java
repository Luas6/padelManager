package com.saul.padelManager.gestionReservas.model;

import com.saul.padelManager.gestionUsuarios.model.Usuario;

import java.util.List;

public record PistaDetallada(int numero, boolean disponible, int huecos, boolean abierta, Long reserva_id, List<Usuario> usuarios) {}
