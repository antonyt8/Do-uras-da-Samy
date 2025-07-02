package com.example.demo.controller;

import com.example.demo.dto.MovimentacaoEstoqueRequestDTO;
import com.example.demo.dto.MovimentacaoEstoqueResponseDTO;
import com.example.demo.service.MovimentacaoEstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
public class MovimentacaoEstoqueController {

    @Autowired
    private MovimentacaoEstoqueService movimentacaoService;

    @PostMapping
    public MovimentacaoEstoqueResponseDTO criar(@RequestBody MovimentacaoEstoqueRequestDTO dto) {
        return movimentacaoService.criarMovimentacao(dto);
    }

    @GetMapping
    public List<MovimentacaoEstoqueResponseDTO> listar() {
        return movimentacaoService.listarTodas();
    }
}
