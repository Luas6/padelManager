package com.saul.padelManager.gestionUsuarios.controller;

import com.saul.padelManager.gestionUsuarios.exceptions.ResourceNotFoundException;
import com.saul.padelManager.gestionUsuarios.model.LoginCredenciales;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.repository.UsuarioRepository;
import com.saul.padelManager.gestionUsuarios.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;
    @Autowired
    public UsuarioController(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }
    /* Login Usuario*/
    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody LoginCredenciales usuario) {

        String correo = usuario.correo();
        String contrasena = usuario.contrasena();

        Optional<Usuario> usuarioEncontradoEmail = usuarioRepository.findByCorreo(correo);
        if (usuarioEncontradoEmail.isPresent()) {
            Usuario usuarioEncontrado = usuarioEncontradoEmail.get();
            String passwordAVerificar=usuarioEncontrado.getContrasena();
            //System.out.println(passwordEncoder.encode(passwordAVerificar));
            boolean contrasenasCoinciden = passwordEncoder.matches(contrasena, passwordAVerificar);

            if(!contrasenasCoinciden){
                //Contraseña incorrecta
                return ResponseEntity.notFound().build();
            }

            String jwt = jwtUtils.generateToken(usuarioEncontrado.getId(), usuarioEncontrado.getCorreo());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + jwt);
            return ResponseEntity.ok().headers(headers).body(usuarioEncontrado.getCorreo());
            //return ResponseEntity.ok(jwt);
            //return ResponseEntity.ok(usuarioEncontrado);

        } else {
            //Usuario no encontrado
            return ResponseEntity.notFound().build();
        }
    }

    /*Register*/
    // Crear Usuario
    @PostMapping("/registro")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    /* CRUD Usuarios*/

    // Sacar todos los usuarios
    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    // Recuperar usuario por id
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id,@RequestBody Usuario usuario) {
        Usuario usuarioACambiar = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        //Setteo los cambios con los nuevos
        usuarioACambiar.setNombre(usuario.getNombre());
        usuarioACambiar.setApellidos(usuario.getApellidos());
        usuarioACambiar.setCorreo(usuario.getCorreo());
        usuarioRepository.save(usuarioACambiar);
        return ResponseEntity.ok(usuarioACambiar);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> deleteUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        usuarioRepository.delete(usuario);
        return ResponseEntity.ok(usuario);
    }
    /* Fin CRUD Usuarios*/

}
