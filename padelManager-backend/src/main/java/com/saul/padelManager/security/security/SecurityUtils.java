package com.saul.padelManager.security.security;
import com.saul.padelManager.utils.exceptions.BadCredentialsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {
    public static void validarPropietario(Long id, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long idUsuarioAutenticado = JwtUtils.getUserIdFromToken(token);
        CompararIds(id, idUsuarioAutenticado);
    }

    private static void CompararIds(Long id, Long idUsuarioAutenticado) {
        if (!id.equals(idUsuarioAutenticado)) {
            throw new BadCredentialsException("No tienes permisos para realizar esta operación");
        }
    }
}
