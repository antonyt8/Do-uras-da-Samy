package com.example.demo.dto;

import java.math.BigDecimal;

public class MaterialDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String categoria;
    private String unidade;
    private BigDecimal precoUnitario;
    private String fornecedor;
    private BigDecimal estoqueAtual;
    private BigDecimal estoqueMinimo;
    
    // Construtores
    public MaterialDTO() {}
    
    public MaterialDTO(Long id, String nome, String descricao, String categoria, String unidade,
                      BigDecimal precoUnitario, String fornecedor, BigDecimal estoqueAtual, BigDecimal estoqueMinimo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.unidade = unidade;
        this.precoUnitario = precoUnitario;
        this.fornecedor = fornecedor;
        this.estoqueAtual = estoqueAtual;
        this.estoqueMinimo = estoqueMinimo;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public String getCategoria() {
        return categoria;
    }
    
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    public String getUnidade() {
        return unidade;
    }
    
    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }
    
    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }
    
    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
    
    public String getFornecedor() {
        return fornecedor;
    }
    
    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }
    
    public BigDecimal getEstoqueAtual() {
        return estoqueAtual;
    }
    
    public void setEstoqueAtual(BigDecimal estoqueAtual) {
        this.estoqueAtual = estoqueAtual;
    }
    
    public BigDecimal getEstoqueMinimo() {
        return estoqueMinimo;
    }
    
    public void setEstoqueMinimo(BigDecimal estoqueMinimo) {
        this.estoqueMinimo = estoqueMinimo;
    }
} 