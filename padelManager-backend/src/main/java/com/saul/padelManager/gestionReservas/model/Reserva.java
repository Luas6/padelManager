package com.saul.padelManager.gestionReservas.model;

import com.saul.padelManager.gestionUsuarios.model.Usuario;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @ManyToMany
    @JoinTable(
            name = "reserva_usuario",
            joinColumns = @JoinColumn(name = "reserva_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> usuarios = new ArrayList<>(4);
    @Column(name= "abierta")
    private boolean abierta;

    public Reserva() {
    }

    public Reserva(Long ID, String fecha, String hora, int pista, List<Usuario> usuarios, boolean abierta) {
        this.ID = ID;
        this.fecha = fecha;
        this.hora = hora;
        this.pista = pista;
        this.usuarios  = usuarios ;
        this.abierta = abierta;
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

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public boolean isAbierta() {
        return abierta;
    }

    public void setAbierta(boolean abierta) {
        this.abierta = abierta;
    }
}
