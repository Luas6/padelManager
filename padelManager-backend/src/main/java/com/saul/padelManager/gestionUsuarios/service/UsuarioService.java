package com.saul.padelManager.gestionUsuarios.service;

import com.saul.padelManager.utils.exceptions.*;
import com.saul.padelManager.gestionUsuarios.model.LoginCredenciales;
import com.saul.padelManager.gestionUsuarios.model.TokenResponse;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.repository.UsuarioRepository;
import com.saul.padelManager.security.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public TokenResponse loginUsuario(LoginCredenciales usuario) {
        //Lo valido para evitar posibles inyecciones sql
        validarCorreo(usuario.correo());
        comprobarNotNull(usuario.contrasena());

        String correo = usuario.correo();
        String contrasena = usuario.contrasena();

        Optional<Usuario> usuarioEncontradoEmail = usuarioRepository.findByCorreo(correo);
        if (usuarioEncontradoEmail.isPresent()) {
            Usuario usuarioEncontrado = usuarioEncontradoEmail.get();
            String passwordAVerificar = usuarioEncontrado.getContrasena();
            boolean contrasenasCoinciden = passwordEncoder.matches(contrasena, passwordAVerificar);

            if (!contrasenasCoinciden) {
                throw new BadCredentialsException("Contraseña incorrecta");
            }

            String jwt = jwtUtils.generateToken(usuarioEncontrado.getId(), usuarioEncontrado.getCorreo());
            return new TokenResponse(jwt,usuarioEncontrado.getId());
        } else {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
    }

    public TokenResponse invalidTokenResponse(){
        return new TokenResponse(null,null);
    }


    public Usuario createUsuario(Usuario usuario) {
        comprobarNotNull(usuario.getNombre());
        comprobarNotNull(usuario.getContrasena());
        comprobarCorreoEnUso(usuario);
        validarCorreo(usuario.getCorreo());
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con el ID: " + id));
    }

    public Usuario updateUsuario(Long id, Usuario usuario) {
        comprobarNotNull(usuario.getNombre());
        comprobarNotNull(usuario.getContrasena());
        Usuario usuarioACambiar = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con el ID: " + id));
        comprobarCorreoEnUso(usuario);
        validarCorreo(usuario.getCorreo());
        // Setteo los cambios con los nuevos
        usuarioACambiar.setNombre(usuario.getNombre());
        usuarioACambiar.setApellidos(usuario.getApellidos());
        usuarioACambiar.setCorreo(usuario.getCorreo());
        return usuarioRepository.save(usuarioACambiar);
    }

    public void deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con el ID: " + id));
        usuarioRepository.delete(usuario);
    }

    /* VALIDACIONES */
    private void comprobarCorreoEnUso(Usuario usuario) {
        Optional<Usuario> comprobarCorreo = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (comprobarCorreo.isPresent()){
            throw new CorreoExistenteException("Correo ya en uso");
        }
    }
    private void validarCorreo(String correo) {
        comprobarNotNull(correo);
        String regex = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(correo);
        if (!matcher.matches()) {
            throw new InvalidFormatException("Correo no válido");
        }
    }
    private static <T> void comprobarNotNull(T value) {
        if (value == null || value instanceof String && ((String) value).isEmpty()) {
            throw new CampoRequeridoException("Faltan campos en la solicitud");
        }
    }

}
