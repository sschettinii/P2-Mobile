package com.example.demo.repository;

import com.example.demo.model.Receitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceitasRepository
        extends JpaRepository<Receitas, Long> {

    List<Receitas> findByNomeContainingIgnoreCaseOrIngredientesContainingIgnoreCaseOrModoDePreparoContainingIgnoreCase(
            String nome, String ingredientes, String modoDePreparo);
}