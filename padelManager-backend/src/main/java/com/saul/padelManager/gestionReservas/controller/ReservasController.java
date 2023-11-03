package com.saul.padelManager.gestionReservas.controller;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.service.ReservasService;
import com.saul.padelManager.utils.ConstantesProyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ConstantesProyecto.BASE_API_PATH)
public class ReservasController {

    private final ReservasService reservasService;

    @Autowired
    public ReservasController(ReservasService reservasService) {
        this.reservasService = reservasService;
    }

    @GetMapping("/reservas")
    public List<Reserva> getAllReservas() {
        return reservasService.getAllReservas();
    }

    @GetMapping("/reservas/{fecha}")
    public List<Reserva> getReservasByFecha(@PathVariable String fecha) {
        return reservasService.getReservasByFecha(fecha);
    }

    @GetMapping("/reservas/{dia}/{hora}")
    public List<Integer> getPistasDisponibles(@PathVariable String dia, @PathVariable String hora) {
        return reservasService.getPistasDisponibles(dia, hora);
    }

    @PostMapping("/reservas")
    public Reserva reservaUsuario(@RequestBody Reserva reserva) {
        return reservasService.reservaUsuario(reserva);
    }
}
