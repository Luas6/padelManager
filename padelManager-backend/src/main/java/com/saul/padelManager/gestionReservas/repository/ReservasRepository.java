package com.saul.padelManager.gestionReservas.repository;

import com.saul.padelManager.gestionReservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservasRepository extends JpaRepository <Reserva,Long> {
    Optional<List<Reserva>> findByFecha(String fecha);

    List<Reserva> findByFechaAndHora(String fecha, String hora);
}
