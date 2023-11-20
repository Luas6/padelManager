package com.saul.padelManager.security.security;
import com.saul.padelManager.utils.exceptions.BadCredentialsException;
import jakarta.servlet.http.HttpServletRequest;

public class SecurityUtils {
    public static void validarPropietarioParaEliminarUsuario(Long id, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long idUsuarioAutenticado = JwtUtils.getUserIdFromToken(token);
        validarPropietario(id, idUsuarioAutenticado);
    }

    private static void validarPropietario(Long id, Long idUsuarioAutenticado) {
        if (!id.equals(idUsuarioAutenticado)) {
            throw new BadCredentialsException("No tienes permisos para realizar esta operación");
        }
    }
}
