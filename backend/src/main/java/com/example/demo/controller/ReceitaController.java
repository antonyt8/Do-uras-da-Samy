package com.example.demo.controller;

import com.example.demo.dto.ReceitaDTO;
import com.example.demo.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/receitas")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceitaController {
    @Autowired
    private ReceitaService receitaService;

    @GetMapping
    public List<ReceitaDTO> getAll() {
        return receitaService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ReceitaDTO> getById(@PathVariable Long id) {
        return receitaService.findById(id);
    }

    @PostMapping
    public ReceitaDTO create(@RequestBody ReceitaDTO receitaDTO) {
        return receitaService.save(receitaDTO);
    }

    @PutMapping("/{id}")
    public ReceitaDTO update(@PathVariable Long id, @RequestBody ReceitaDTO receitaDTO) {
        return receitaService.update(id, receitaDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        receitaService.deleteById(id);
    }
} 