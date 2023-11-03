package com.saul.padelManager.gestionReservas.service;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.repository.ReservasRepository;
import com.saul.padelManager.utils.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservasService {

    private final ReservasRepository reservasRepository;

    @Autowired
    public ReservasService(ReservasRepository reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    public List<Reserva> getAllReservas() {
        return reservasRepository.findAll();
    }

    public Reserva reservaUsuario(Reserva reserva) {
        return reservasRepository.save(reserva);
    }

    public List<Reserva> getReservasByFecha(String fecha) {
        Optional<List<Reserva>> reservasOptional = reservasRepository.findByFecha(fecha);
        if(reservasOptional.isEmpty() || reservasOptional.get().isEmpty()){
            throw new ResourceNotFoundException("Reservas no encontradas");
        }
        return reservasOptional.get();
    }
}
