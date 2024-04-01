package com.saul.padelManager.gestionUsuarios.controller;

import com.saul.padelManager.gestionUsuarios.model.LoginCredenciales;
import com.saul.padelManager.gestionUsuarios.model.TokenResponse;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import com.saul.padelManager.gestionUsuarios.service.UsuarioService;
import com.saul.padelManager.security.security.SecurityUtils;
import com.saul.padelManager.utils.ConstantesProyecto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ConstantesProyecto.BASE_API_PATH)
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginUsuario(@RequestBody LoginCredenciales usuario) {
        TokenResponse tokenResponse = usuarioService.loginUsuario(usuario);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/registro")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.createUsuario(usuario);
    }

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id);
        return ResponseEntity.ok(usuario);
    }

    @PreAuthorize("@securityUtils.validarPropietario(#id, #request)")
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario, HttpServletRequest request) {
        Usuario usuarioActualizado = usuarioService.updateUsuario(id, usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @PreAuthorize("@securityUtils.validarPropietario(#id, #request)")
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> deleteUsuario(@PathVariable Long id , HttpServletRequest request) {

        //SecurityUtils.validarPropietario(id, request);
        usuarioService.deleteUsuario(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/checklogin")
    public ResponseEntity<Boolean> comprobarLoginUsuario() {
        return ResponseEntity.ok(true);
    }
}