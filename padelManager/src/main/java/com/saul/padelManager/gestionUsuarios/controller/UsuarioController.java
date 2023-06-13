package com.saul.padelManager.gestionUsuarios.controller;

import com.saul.padelManager.gestionUsuarios.exceptions.ResourceNotFoundException;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

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

    // Crear Usuario
    @PostMapping("/usuarios")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
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

    /* Solucionar Error CORS*/
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }

}
