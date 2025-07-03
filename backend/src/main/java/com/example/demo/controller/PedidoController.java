package com.example.demo.controller;

import com.example.demo.dto.PedidoDTO;
import com.example.demo.service.PedidoService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "https://sammy-front.onrender.com")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<PedidoDTO>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> getPedidoById(@PathVariable Long id) {
        Optional<PedidoDTO> pedido = pedidoService.findById(id);
        return pedido
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(
        @RequestBody PedidoDTO pedidoDTO
    ) {
        PedidoDTO created = pedidoService.save(pedidoDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PedidoDTO> updateStatus(
        @PathVariable Long id,
        @RequestParam String status
    ) {
        PedidoDTO updated = pedidoService.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> updatePedido(
        @PathVariable Long id,
        @RequestBody PedidoDTO pedidoDTO
    ) {
        try {
            PedidoDTO updated = pedidoService.update(id, pedidoDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        pedidoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
