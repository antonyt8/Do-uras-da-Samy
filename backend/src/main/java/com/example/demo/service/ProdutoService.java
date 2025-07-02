package com.example.demo.service;

import com.example.demo.dto.ProdutoRequestDTO;
import com.example.demo.model.Produto;
import com.example.demo.model.Receita;
import com.example.demo.repository.ProdutoRepository;
import com.example.demo.repository.ReceitaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    private ReceitaRepository receitaRepository;
//    private final PrecificacaoRepository precificacaoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
//        this.precificacaoRepository = precificacaoRepository;
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll().stream()
                .toList();
    }

    public Produto salvarProduto(ProdutoRequestDTO produtoRequest) {
        Receita receita = receitaRepository.findById(produtoRequest.receitaId())
                .orElseThrow(() -> new EntityNotFoundException("Receita não encontrada"));

        Produto produto = new Produto();
        produto.setDescricao(produtoRequest.descricao());
        produto.setCustoUnitario(produtoRequest.custoUnitario());
        produto.setMargemLucro(produtoRequest.margemLucro());
        produto.setQuantidadeProduzida(produtoRequest.quantidadeProduzida());
        produto.setQuantidadeEstoqueAtual(0L);
        produto.setPrecoSugerido(produtoRequest.precoSugerido());

        produto.setReceita(receita);

        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Integer id, ProdutoRequestDTO produtoRequest) {
        Receita receita = new Receita();
        receita.setId(produtoRequest.receitaId());

        Produto produto = produtoRepository.findById(id).orElseThrow();
        produto.setDescricao(produtoRequest.descricao());
        produto.setCustoUnitario(produtoRequest.custoUnitario());
        produto.setMargemLucro(produtoRequest.margemLucro());
        produto.setQuantidadeProduzida(produtoRequest.quantidadeProduzida());
        produto.setPrecoSugerido(produtoRequest.precoSugerido());
        produto.setReceita(receita);

        return produtoRepository.save(produto);
    }

    public Optional<Produto> buscarPorId(Integer id) {
        return produtoRepository.findById(id);
    }

    public void deletarProduto(Integer id) {
        produtoRepository.deleteById(id);
    }

}
