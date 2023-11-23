package com.saul.padelManager.gestionReservas.controller;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.service.ReservasService;
import com.saul.padelManager.utils.ConstantesProyecto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    //@PreAuthorize("@securityUtils.validarPropietario(#usuarioId, #request)")
    @GetMapping("/reservas/usuario/{usuarioId}")
    public List<Reserva> getReservasByUsuario(@PathVariable Long usuarioId , HttpServletRequest request) {
        return reservasService.getReservasByUsuario(usuarioId);
    }

    @PostMapping("/reservas")
    public Reserva createUsuario(@RequestBody Reserva reserva) {
        return reservasService.createReserva(reserva);
    }

    @PreAuthorize("@securityUtils.validarPropietarioReserva(#id, #request)")
    @DeleteMapping("/reservas/{id}")
    public ResponseEntity<Reserva> deleteReserva(@PathVariable Long id , HttpServletRequest request) {
        reservasService.deleteReserva(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/disponibles/{fecha}/{hora}")
    public List<Integer> getPistasDisponibles(@PathVariable String fecha, @PathVariable String hora) {
        return reservasService.getPistasDisponibles(fecha, hora);
    }
    @GetMapping("/disponibles/{fecha}")
    public List<String> getHorasDisponibles(@PathVariable String fecha) {
        return reservasService.getHorasDisponibles(fecha);
    }
}
