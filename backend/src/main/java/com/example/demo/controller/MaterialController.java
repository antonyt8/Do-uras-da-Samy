package com.example.demo.controller;

import com.example.demo.dto.MaterialDTO;
import com.example.demo.service.MaterialService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/materiais")
@CrossOrigin(origins = "https://sammy-front.onrender.com")
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
        return material
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MaterialDTO> createMaterial(
        @RequestBody MaterialDTO materialDTO
    ) {
        MaterialDTO createdMaterial = materialService.save(materialDTO);
        return ResponseEntity.ok(createdMaterial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaterialDTO> updateMaterial(
        @PathVariable Long id,
        @RequestBody MaterialDTO materialDTO
    ) {
        try {
            MaterialDTO updatedMaterial = materialService.update(
                id,
                materialDTO
            );
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

    @GetMapping("/valor-total-estoque")
    public ResponseEntity<BigDecimal> getValorTotalEstoque() {
        BigDecimal valor = materialService.calcularValorTotalEstoque();
        return ResponseEntity.ok(valor);
    }

    @PutMapping("/{id}/estoque")
    public ResponseEntity<Void> atualizarEstoque(
        @PathVariable Long id,
        @RequestParam BigDecimal quantidade
    ) {
        materialService.atualizarEstoque(id, quantidade);
        return ResponseEntity.ok().build();
    }
}
