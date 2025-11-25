package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.cglib.core.Local;

import java.time.LocalTime;

@Entity
@Table(name ="receitas")
public class Receitas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(max = 30, message = "O nome deve ter no máximo 30 caracteres")
    private String nome;

    @NotBlank(message = "Os ingredientes não pode estar em branco")
    @Size(max = 250, message = "Os ingredientes deve ter no máximo 250 caracteres")
    private String ingredientes;

    @NotBlank(message = "O modo de preparo não pode estar em branco")
    @Size(max = 1000, message = "O modo de preparo deve ter no máximo 1000 caracteres")
    private String modoDePreparo;

    @NotBlank(message = "O tempo de preparo não pode estar em branco")
    @Size(max = 20, message = "O tempo de preparo deve ter no máximo 1000 caracteres")
    private String tempoDePreparo;

    public Receitas() {}

    public Receitas(String nome, String ingredientes, String modoDePreparo, String tempoDePreparo) {
        this.nome = nome;
        this.ingredientes = ingredientes;
        this.modoDePreparo = modoDePreparo;
        this.tempoDePreparo = tempoDePreparo;
    }

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

    public String getIngredientes() {
        return ingredientes;
    }
    public void setIngredientes(String ingredientes) { this.ingredientes = ingredientes; }

    public String getModoDePreparo() {
        return modoDePreparo;
    }
    public void setModoDePreparo(String modoDePreparo) { this.modoDePreparo = modoDePreparo; }

    public String getTempoDePreparo() {
        return tempoDePreparo;
    }
    public void setTempoDePreparo(String tempoDePreparo) { this.tempoDePreparo = tempoDePreparo; }
}