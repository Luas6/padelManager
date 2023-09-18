package com.saul.padelManager.gestionReservas.controller;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.repository.ReservasRepository;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class ReservasController {

    @Autowired
    private ReservasRepository reservasRepository;

    @Autowired
    public ReservasController(ReservasRepository reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    @GetMapping("/reservas")
    public List<Reserva> getAllReservas(){
        return reservasRepository.findAll();
    }

    @PostMapping("/reservas")
    public Reserva reservaUsuario(@RequestBody Reserva reserva){
        return reservasRepository.save(reserva);
    }

}
