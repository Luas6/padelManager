package com.saul.padelManager.gestionReservas.repository;

import com.saul.padelManager.gestionReservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservasRepository extends JpaRepository <Reserva,Long> {
}
