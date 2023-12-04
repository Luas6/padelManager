package com.saul.padelManager.gestionUsuarios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name= "nivel")
    private Float nivel;

    @JsonIgnore
    @Column(name= "correo")
    private String correo;
    @JsonIgnore
    @Column(name = "contrasena")
    private String contrasena;

    /*
    @ManyToOne(optional = false)
    private Rol rol;*/

    public Usuario() {
    }

    public Usuario(long id, String nombre, String apellidos, Float nivel, String correo, String contrasena) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nivel = nivel;
        this.correo = correo;
        this.contrasena = contrasena;
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

    public Float getNivel() {
        return nivel;
    }

    public void setNivel(Float nivel) {
        this.nivel = nivel;
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

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellidos='" + apellidos + '\'' +
                ", correo='" + correo + '\'' +
                ", contrasena='" + contrasena + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return id == usuario.id && Objects.equals(nombre, usuario.nombre) && Objects.equals(apellidos, usuario.apellidos) && Objects.equals(correo, usuario.correo) && Objects.equals(contrasena, usuario.contrasena);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, apellidos, correo, contrasena);
    }
}