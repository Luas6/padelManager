package com.saul.padelManager.gestionUsuarios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private Float nivel=3.5F;

    @Column(name= "correo")
    private String correo;

    @Column(name = "contrasena")
    private String contrasena;

    @Column(name = "administrador")
    private Boolean administrador=false;

    /*
    @ManyToOne(optional = false)
    private Rol rol;*/

    public Usuario() {
    }

    public Usuario(long id, String nombre, String apellidos, Float nivel, String correo, String contrasena, Boolean administrador) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nivel = nivel;
        this.correo = correo;
        this.contrasena = contrasena;
        this.administrador = administrador;
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
    @JsonIgnore
    public String getContrasena() {
        return contrasena;
    }

    @JsonProperty
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    @JsonIgnore
    public Boolean getAdministrador() {
        return administrador;
    }

    @JsonProperty
    public void setAdministrador(Boolean administrador) {
        this.administrador = administrador;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellidos='" + apellidos + '\'' +
                ", nivel=" + nivel +
                ", correo='" + correo + '\'' +
                ", contrasena='" + contrasena + '\'' +
                ", administrador=" + administrador +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return id == usuario.id && Objects.equals(nombre, usuario.nombre) && Objects.equals(apellidos, usuario.apellidos) && Objects.equals(nivel, usuario.nivel) && Objects.equals(correo, usuario.correo) && Objects.equals(contrasena, usuario.contrasena) && Objects.equals(administrador, usuario.administrador);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, apellidos, nivel, correo, contrasena, administrador);
    }
}