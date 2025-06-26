package com.example.demo.controller;

import com.example.demo.dto.MaterialDTO;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materiais")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialController {
    
    @Autowired
    private MaterialService materialService;
    
    @GetMapping
    public ResponseEntity<List<MaterialDTO>> getAllMateriais() {
        List<MaterialDTO> materiais = materialService.findAll();
        return ResponseEntity.ok(materiais);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> getMaterialById(@PathVariable Long id) {
        Optional<MaterialDTO> material = materialService.findById(id);
        return material.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<MaterialDTO> createMaterial(@RequestBody MaterialDTO materialDTO) {
        MaterialDTO createdMaterial = materialService.save(materialDTO);
        return ResponseEntity.ok(createdMaterial);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MaterialDTO> updateMaterial(@PathVariable Long id, @RequestBody MaterialDTO materialDTO) {
        try {
            MaterialDTO updatedMaterial = materialService.update(id, materialDTO);
            return ResponseEntity.ok(updatedMaterial);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<MaterialDTO>> getMateriaisByCategoria(@PathVariable String categoria) {
        List<MaterialDTO> materiais = materialService.findByCategoria(categoria);
        return ResponseEntity.ok(materiais);
    }
    
    @GetMapping("/estoque-baixo")
    public ResponseEntity<List<MaterialDTO>> getMateriaisComEstoqueBaixo() {
        List<MaterialDTO> materiais = materialService.findMateriaisComEstoqueBaixo();
        return ResponseEntity.ok(materiais);
    }
    
    @GetMapping("/sem-estoque")
    public ResponseEntity<List<MaterialDTO>> getMateriaisSemEstoque() {
        List<MaterialDTO> materiais = materialService.findMateriaisSemEstoque();
        return ResponseEntity.ok(materiais);
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<MaterialDTO>> buscarMateriais(@RequestParam String termo) {
        List<MaterialDTO> materiais = materialService.findByNomeOuDescricaoContaining(termo);
        return ResponseEntity.ok(materiais);
    }
    
    @GetMapping("/valor-total-estoque")
    public ResponseEntity<BigDecimal> getValorTotalEstoque() {
        BigDecimal valor = materialService.calcularValorTotalEstoque();
        return ResponseEntity.ok(valor);
    }
    
    @PutMapping("/{id}/estoque")
    public ResponseEntity<Void> atualizarEstoque(@PathVariable Long id, @RequestParam BigDecimal quantidade) {
        materialService.atualizarEstoque(id, quantidade);
        return ResponseEntity.ok().build();
    }
} 