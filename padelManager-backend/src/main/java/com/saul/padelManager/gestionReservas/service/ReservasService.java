package com.saul.padelManager.gestionReservas.service;

import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.repository.ReservasRepository;
import com.saul.padelManager.utils.ConstantesProyecto;
import com.saul.padelManager.utils.FuncionesUtil;
import com.saul.padelManager.utils.exceptions.ReservaExistenteException;
import com.saul.padelManager.utils.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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

    public Reserva createReserva(Reserva reserva) {
        FuncionesUtil.esFechaValida(reserva.getFecha());
        FuncionesUtil.esHoraValida(reserva.getHora());
        FuncionesUtil.esPistaValida(reserva.getPista());
        FuncionesUtil.comprobarNotNull(reserva.getUsuarios());
        comprobarReservaExistente(reserva);
        return reservasRepository.save(reserva);
    }

    public Reserva getReservaById(Long id) {
        Optional<Reserva> reservasOptional = reservasRepository.findById(id);
        if(reservasOptional.isEmpty()){
            throw new ResourceNotFoundException("Reservas no encontradas");
        }
        return reservasOptional.get();
    }

    public List<Reserva> getReservasByFecha(String fecha) {
        Optional<List<Reserva>> reservasOptional = reservasRepository.findByFecha(fecha);
        if(reservasOptional.isEmpty() || reservasOptional.get().isEmpty()){
            throw new ResourceNotFoundException("Reservas no encontradas");
        }
        return reservasOptional.get();
    }

    public List<Reserva> getReservasByUsuario(Long id_usuario) {
        List<Reserva> reservasOptional = reservasRepository.findByUsuarioId(id_usuario);
        return reservasOptional;
    }

    public void deleteReserva(Long id) {
        Reserva reserva = reservasRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con el ID: " + id));
        reservasRepository.delete(reserva);
    }

    public List<Integer> getPistasDisponibles(String fecha, String hora) {

        List<Reserva> reservas = reservasRepository.findByFechaAndHora(fecha, hora);

        List<Integer> pistasDisponibles = new ArrayList<>();
        for (int i = 1; i <= ConstantesProyecto.NUMERO_PISTAS; i++){
            pistasDisponibles.add(i);
        }
        for (Reserva reserva : reservas) {
            int pistaOcupada = reserva.getPista();
            if (pistasDisponibles.contains(pistaOcupada)) {
                pistasDisponibles.remove(Integer.valueOf(pistaOcupada));
                //Sin el Integer.ofValue trata el numero como el indice de la pista en vez de como la pista a eliminar
            }
        }

        return pistasDisponibles;
    }

    public List<String> getHorasDisponibles(String fecha) {
        List<String> horasDisponibles = new ArrayList<>();
        List<Integer> pistasDisponibles = new ArrayList<>();

        for (String hora : ConstantesProyecto.HORAS_DISPONIBLES) {
            // Verifica la disponibilidad de pistas para la hora actual
            pistasDisponibles.clear();
            for (int i = 1; i <= ConstantesProyecto.NUMERO_PISTAS; i++) {
                pistasDisponibles.add(i);
            }

            List<Reserva> reservas;
            try {
                reservas = getReservasByFecha(fecha);
            } catch (ResourceNotFoundException ex) {
                reservas = Collections.emptyList();
            }
            for (Reserva reserva : reservas) {
                if (reserva.getHora().equals(hora)) {
                    int pistaOcupada = reserva.getPista();
                    if (pistasDisponibles.contains(pistaOcupada)) {
                        pistasDisponibles.remove(Integer.valueOf(pistaOcupada));
                    }
                }
            }
            // Comprueba 1 pista disponible
            if (!pistasDisponibles.isEmpty()) {
                horasDisponibles.add(hora);
            }
        }
        return horasDisponibles;
    }


    private void comprobarReservaExistente(Reserva reserva) {
        if (reservasRepository.existsByFechaAndHoraAndPista(reserva.getFecha(), reserva.getHora(), reserva.getPista())) {
            throw new ReservaExistenteException("Ya hay una reserva en esta hora fecha y día.");
        }
    }

}
