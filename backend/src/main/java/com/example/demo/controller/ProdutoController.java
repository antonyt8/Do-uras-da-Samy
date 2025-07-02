package com.example.demo.controller;


import com.example.demo.dto.ProdutoRequestDTO;
import com.example.demo.model.Produto;
import com.example.demo.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarProdutos();
    }

    @PostMapping
    public ResponseEntity<Produto> salvarProduto(@RequestBody ProdutoRequestDTO produto) {
        Produto savedProduto = produtoService.salvarProduto(produto);
        return new ResponseEntity<>(savedProduto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Integer id, @RequestBody ProdutoRequestDTO produto) {
        Produto updatedProduto = produtoService.atualizarProduto(id, produto);
        return new ResponseEntity<>(updatedProduto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getMaterialPorId(@PathVariable Integer id) {
        Optional<Produto> produto = produtoService.buscarPorId(id);
        return produto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
        produtoService.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }
}
