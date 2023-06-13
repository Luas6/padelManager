package com.saul.padelManager.gestionUsuarios.repository;
import com.saul.padelManager.gestionUsuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
//Jpa Repository nos da acceso a un montón de métodos como save, findAll... Por lo que no necesito crear nuevos métodos
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}

