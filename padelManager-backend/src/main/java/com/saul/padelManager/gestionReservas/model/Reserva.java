package com.saul.padelManager.gestionReservas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name= "fecha")
    private String fecha;

    @Column(name= "hora")
    private String hora;
    @Column(name= "pista")
    private int pista;
    @Column(name= "id_usuario")
    private int id_usuario;

    public Reserva() {
    }

    public Reserva(Long ID, String fecha, String hora, int pista, int id_usuario) {
        this.ID = ID;
        this.fecha = fecha;
        this.hora = hora;
        this.pista = pista;
        this.id_usuario = id_usuario;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public int getPista() {
        return pista;
    }

    public void setPista(int pista) {
        this.pista = pista;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }
}
