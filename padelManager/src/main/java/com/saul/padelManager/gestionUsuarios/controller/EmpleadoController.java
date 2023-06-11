package com.saul.padelManager.gestionUsuarios.controller;

import com.saul.padelManager.gestionUsuarios.exceptions.ResourceNotFoundException;
import com.saul.padelManager.gestionUsuarios.model.Empleado;
import com.saul.padelManager.gestionUsuarios.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    /* CRUD Empleados*/

    // Sacar todos los empleados
    @GetMapping("/empleados")
    public List<Empleado> getAllEmpleados(){
        return empleadoRepository.findAll();
    }

    // Recuperar empleado por id
    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(empleado);
    }

    // Crear Empleado
    @PostMapping("/empleados")
    public Empleado createEmpleado(@RequestBody Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id,@RequestBody Empleado empleado) {
        Empleado empleadoACambiar = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        //Setteo los cambios con los nuevos
        empleadoACambiar.setNombre(empleado.getNombre());
        empleadoACambiar.setApellidos(empleado.getApellidos());
        empleadoACambiar.setCorreo(empleado.getCorreo());
        empleadoRepository.save(empleadoACambiar);
        return ResponseEntity.ok(empleadoACambiar);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Empleado> deleteEmpleado(@PathVariable Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        empleadoRepository.delete(empleado);
        return ResponseEntity.ok(empleado);
    }


    /* Fin CRUD Empleados*/

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
