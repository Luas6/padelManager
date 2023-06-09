package com.saul.padelManager.gestionUsuarios.model;

import com.saul.padelManager.gestionUsuarios.repository.RolRepository;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name= "nombre")
    private String nombre;
    @Column(name= "apellidos")
    private String apellidos;
    @Column(name= "correo")
    private String correo;
    @Column(name = "contrasena")
    private String contrasena;

    /*
    @ManyToOne(optional = false)
    private Rol rol;*/

    public Usuario() {
    }

    public Usuario(String nombre, String apellidos, String correo, String contrasena, Rol rol) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
        //this.rol = new Rol("cliente");
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

}