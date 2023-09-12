package com.saul.padelManager.gestionReservas.controller;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.repository.ReservasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class ReservasController {

    @Autowired
    private ReservasRepository reservasRepository;

    @Autowired
    public ReservasController(ReservasRepository reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    @PostMapping("/reservas")
    public Reserva reservaUsuario(@RequestBody Reserva reserva){
        return reservasRepository.save(reserva);
    }

}
