package com.saul.padelManager.gestionUsuarios.repository;

import com.saul.padelManager.gestionUsuarios.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository <Rol, Long> {
}
