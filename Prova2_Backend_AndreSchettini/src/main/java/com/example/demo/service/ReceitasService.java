package com.example.demo.service;

import com.example.demo.model.Receitas;
import com.example.demo.repository.ReceitasRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitasService {
    private final ReceitasRepository repository;

    public ReceitasService(ReceitasRepository repository) { this.repository = repository; }

    public List<Receitas> getAll() {
        return repository.findAll();
    }
    public Receitas create(Receitas receita) {
        return repository.save(receita);
    }
    public void remove(Long id) { repository.deleteById(id); }
    public List<Receitas> search(String termo) {
        if (termo == null || termo.isEmpty()) {
            return repository.findAll();
        }
        return repository.findByNomeContainingIgnoreCaseOrIngredientesContainingIgnoreCaseOrModoDePreparoContainingIgnoreCase(termo, termo, termo);
    }
}