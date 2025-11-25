package com.example.demo.controller;

import com.example.demo.model.Receitas;
import com.example.demo.service.ReceitasService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/receitas")
@CrossOrigin(origins = "*")
public class ReceitasApiController {

    private final ReceitasService service;

    public ReceitasApiController(ReceitasService service) {
        this.service = service;
    }

    @GetMapping
    public List<Receitas> listar(@RequestParam(value = "termo", required = false) String termo) {
        return service.search(termo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receitas> buscarPorId(@PathVariable Long id) {
        Optional<Receitas> receita = service.getAll().stream()
                .filter(r -> r.getId().equals(id))
                .findFirst();

        return receita.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> salvar(@Valid @RequestBody Receitas receita, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(formatarErros(result));
        }
        Receitas novaReceita = service.create(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReceita);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Receitas receita, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(formatarErros(result));
        }

        receita.setId(id);
        Receitas receitaAtualizada = service.create(receita);
        return ResponseEntity.ok(receitaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.remove(id);
        return ResponseEntity.noContent().build();
    }

    private Map<String, String> formatarErros(BindingResult result) {
        Map<String, String> erros = new HashMap<>();
        result.getFieldErrors().forEach(erro ->
                erros.put(erro.getField(), erro.getDefaultMessage())
        );
        return erros;
    }
}