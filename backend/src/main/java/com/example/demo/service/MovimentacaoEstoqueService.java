package com.example.demo.service;

import com.example.demo.dto.MovimentacaoEstoqueRequestDTO;
import com.example.demo.dto.MovimentacaoEstoqueResponseDTO;
import com.example.demo.model.MovimentacaoEstoque;
import com.example.demo.model.Produto;
import com.example.demo.repository.ProdutoRepository;
import com.example.demo.repository.MovimentacaoEstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoEstoqueService {

    @Autowired
    private MovimentacaoEstoqueRepository movimentacaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public MovimentacaoEstoqueResponseDTO criarMovimentacao(MovimentacaoEstoqueRequestDTO dto) {
        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        MovimentacaoEstoque movimentacao = new MovimentacaoEstoque();
        movimentacao.setProduto(produto);
        movimentacao.setQuantidade(dto.getQuantidade());
        movimentacao.setTipo(dto.getTipo());
        movimentacao.setObservacao(dto.getObservacao());
        System.out.println(movimentacao.getTipo().name());
        if (movimentacao.getTipo().name().equals("ENTRADA")) {
            produto.setQuantidadeEstoqueAtual(produto.getQuantidadeEstoqueAtual() + dto.getQuantidade().longValue());
        } else {
            produto.setQuantidadeEstoqueAtual(produto.getQuantidadeEstoqueAtual() - dto.getQuantidade().longValue());
        }

        movimentacaoRepository.save(movimentacao);
        produtoRepository.save(produto);

        return toResponseDTO(movimentacao);
    }

    public List<MovimentacaoEstoqueResponseDTO> listarTodas() {
        return movimentacaoRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private MovimentacaoEstoqueResponseDTO toResponseDTO(MovimentacaoEstoque m) {
        MovimentacaoEstoqueResponseDTO dto = new MovimentacaoEstoqueResponseDTO();
        dto.setId(m.getId());
        dto.setProdutoId(m.getProduto().getId());
        dto.setTipo(m.getTipo());
        dto.setQuantidade(m.getQuantidade());
        dto.setObservacao(m.getObservacao());
        dto.setDataMovimentacao(m.getDataMovimentacao());
        return dto;
    }
}
