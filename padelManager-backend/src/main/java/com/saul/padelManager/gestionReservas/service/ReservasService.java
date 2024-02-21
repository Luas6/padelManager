package com.saul.padelManager.gestionReservas.service;

import com.saul.padelManager.gestionReservas.model.AbiertasForm;
import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.repository.ReservasRepository;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.service.UsuarioService;
import com.saul.padelManager.utils.ConstantesProyecto;
import com.saul.padelManager.utils.FuncionesUtil;
import com.saul.padelManager.utils.exceptions.ReservaExistenteException;
import com.saul.padelManager.utils.exceptions.ResourceNotFoundException;
import com.saul.padelManager.utils.exceptions.UsuarioConflictException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservasService {

    private final ReservasRepository reservasRepository;

    @Autowired
    public ReservasService(ReservasRepository reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    @Autowired
    UsuarioService usuarioService;
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

    public List<Map<String, Object>> getPistasDetalladas(String fecha, String hora) {

        List<Reserva> reservas = reservasRepository.findByFechaAndHora(fecha, hora);
        List<Map<String, Object>> pistasDetalladas = new ArrayList<>();
        for (int i = 1; i <= ConstantesProyecto.NUMERO_PISTAS; i++) {
            int huecos=0;
            boolean disponible=true;
            boolean abierta=false;
            Map<String, Object> pistaInfo = new HashMap<>();
            for (Reserva reserva : reservas) {
                if (reserva.getPista() == i) {
                    if(reserva.isAbierta()){
                        huecos=4-reserva.getUsuarios().size();
                        abierta=true;
                    }else{
                        disponible=false;
                    }
                    break;
                }
            }

            pistaInfo.put("numero", i);
            pistaInfo.put("disponible", disponible);
            pistaInfo.put("huecos", huecos);
            pistaInfo.put("abierta", abierta);

            pistasDetalladas.add(pistaInfo);
        }

        return pistasDetalladas;
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

    public void unirseAReserva(AbiertasForm abiertasForm) {
        Long idReserva = abiertasForm.idReserva();
        Long idUsuario = abiertasForm.idUsuario();

        FuncionesUtil.comprobarNotNull(idReserva);
        FuncionesUtil.comprobarNotNull(idUsuario);

        Reserva reserva = getReservaById(idReserva);
        if (!reserva.isAbierta()) {
            throw new ReservaExistenteException("La reserva no está abierta para unirse.");
        }
        List<Usuario> usuarios = reserva.getUsuarios();
        if(usuarios.size()>3){
            throw new UsuarioConflictException("La reserva ya está llena");
        }
        for (Usuario usuario : usuarios) {
            if (usuario.getId()== idUsuario) {
                throw new UsuarioConflictException("El usuario ya está unido a esta reserva.");
            }
        }

        Usuario usuario = usuarioService.getUsuarioById(idUsuario);
        usuarios.add(usuario);
        if(usuarios.size()>3){
            reserva.setAbierta(false);
        }
        reservasRepository.save(reserva);
    }

    public List<Reserva> getReservasAbiertas() {
        return reservasRepository.findByAbiertaTrue();
    }
}

