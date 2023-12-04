package com.saul.padelManager.gestionReservas.repository;

import com.saul.padelManager.gestionReservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ReservasRepository extends JpaRepository <Reserva,Long> {
    Optional<List<Reserva>> findByFecha(String fecha);

    List<Reserva> findByFechaAndHora(String fecha, String hora);

    @Query("SELECT r FROM Reserva r JOIN r.usuarios u WHERE u.id = :idUsuario")
    List<Reserva> findByUsuarioId(@Param("idUsuario") Long idUsuario);
    boolean existsByFechaAndHoraAndPista(String fecha, String hora, int pista);

}
