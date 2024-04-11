package com.saul.padelManager.security.security;
import com.saul.padelManager.gestionReservas.model.Reserva;
import com.saul.padelManager.gestionReservas.service.ReservasService;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.repository.UsuarioRepository;
import com.saul.padelManager.utils.exceptions.BadCredentialsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class SecurityUtils {

    private final UsuarioRepository usuarioRepository;

    private final ReservasService reservasService;

    @Autowired
    public SecurityUtils(UsuarioRepository usuarioRepository, ReservasService reservasService) {
        this.usuarioRepository = usuarioRepository;
        this.reservasService = reservasService;
    }

    public boolean validarPropietario(Long id, HttpServletRequest request) {
        String token = getAuthorizationHeader(request);
        Long idUsuarioAutenticado = getUserIdFromToken(token);
        if (esAdmin(idUsuarioAutenticado)) return true;
        compararIds(id, idUsuarioAutenticado);
        return true;
    }

    public boolean validarPropietarioReserva(Long idReserva, HttpServletRequest request) {
        String token = getAuthorizationHeader(request);
        Long idUsuarioAutenticado = getUserIdFromToken(token);
        if (esAdmin(idUsuarioAutenticado)) return true;
        Reserva reserva = reservasService.getReservaById(idReserva);
        compararIds(reserva.getUsuarios().stream().map(Usuario::getId).collect(Collectors.toList()), idUsuarioAutenticado);
        return true;
    }

    public boolean validarAdminUsuario(HttpServletRequest request) {
        String token = getAuthorizationHeader(request);
        Long idUsuarioAutenticado = getUserIdFromToken(token);
        if (esAdmin(idUsuarioAutenticado)){
            return true;
        }else{
            throw new BadCredentialsException("No tienes permisos para acceder a esta reserva.");
        }
    }

    private static void compararIds(Long id, Long idUsuarioAutenticado) {
        if (!id.equals(idUsuarioAutenticado)) {
            throw new BadCredentialsException("No tienes permisos para realizar esta operación");
        }
    }
    private static void compararIds(List<Long> idUsuarios, Long idUsuarioAutenticado) {
        if (idUsuarios == null || idUsuarios.isEmpty() || !idUsuarios.contains(idUsuarioAutenticado)) {
            throw new BadCredentialsException("No tienes permisos para acceder a esta reserva.");
        }
    }

    private boolean esAdmin(Long idUsuarioAutenticado) {
        Optional<Usuario> u = usuarioRepository.findById(idUsuarioAutenticado);
        if(u.isPresent() && u.get().getAdministrador()==true){
            return true;
        }
        return false;
    }
    private static Long getUserIdFromToken(String token) {
        return JwtUtils.getUserIdFromToken(token);
    }

    private static String getAuthorizationHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}
