package com.api.cadastrocliente.cadastrocliente.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "logotipo", columnDefinition = "LONGBLOB")
    private byte[] logotipo;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Logradouro> logradouros = new ArrayList<>();

    // Construtor padrão
    public Cliente() {
    }

    // Construtor com campos (exceto id, que é gerado)
    public Cliente(String nome, String email, byte[] logotipo, List<Logradouro> logradouros) {
        this.nome = nome;
        this.email = email;
        this.logotipo = logotipo;
        this.logradouros = logradouros;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getLogotipo() {
        return logotipo;
    }

    public void setLogotipo(byte[] logotipo) {
        this.logotipo = logotipo;
    }

    public List<Logradouro> getLogradouros() {
        return logradouros;
    }

    public void setLogradouros(List<Logradouro> logradouros) {
        this.logradouros = logradouros;
    }

    public void addLogradouro(Logradouro logradouro) {
        logradouro.setCliente(this);
        this.logradouros.add(logradouro);
    }


}

