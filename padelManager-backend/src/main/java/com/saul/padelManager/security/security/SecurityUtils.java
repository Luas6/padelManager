package com.saul.padelManager.security.security;
import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.service.ReservasService;
import com.saul.padelManager.utils.exceptions.BadCredentialsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    @Autowired
    private ReservasService reservasService;
    public static void validarPropietario(Long id, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long idUsuarioAutenticado = JwtUtils.getUserIdFromToken(token);
        compararIds(id, idUsuarioAutenticado);
    }

    public void validarPropietarioReserva(Long idReserva, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long idUsuarioAutenticado = JwtUtils.getUserIdFromToken(token);
        Reserva reserva = reservasService.getReservaById(idReserva);
        compararIds(reserva.getIdUsuario(), idUsuarioAutenticado);
    }

    private static void compararIds(Long id, Long idUsuarioAutenticado) {
        if (!id.equals(idUsuarioAutenticado)) {
            throw new BadCredentialsException("No tienes permisos para realizar esta operación");
        }
    }
}
