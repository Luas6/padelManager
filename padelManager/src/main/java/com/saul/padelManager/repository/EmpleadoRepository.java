package com.saul.padelManager.repository;
import com.saul.padelManager.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
//Jpa Repository nos da acceso a un montón de métodos como save, findAll... Por lo que no necesito crear nuevos métodos
public interface EmpleadoRepository extends JpaRepository<Empleado, Long>{

}

