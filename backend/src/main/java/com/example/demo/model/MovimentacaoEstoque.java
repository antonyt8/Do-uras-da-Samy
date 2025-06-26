package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacoes_estoque")
public class MovimentacaoEstoque {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacao tipo;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantidade;
    
    @Column(nullable = false)
    private String unidade;
    
    @Column(name = "quantidade_anterior", nullable = false, precision = 10, scale = 2)
    private BigDecimal quantidadeAnterior;
    
    @Column(name = "quantidade_atual", nullable = false, precision = 10, scale = 2)
    private BigDecimal quantidadeAtual;
    
    @Column(columnDefinition = "TEXT")
    private String observacao;
    
    @Column(name = "data_movimentacao", nullable = false)
    private LocalDateTime dataMovimentacao;
    
    public enum TipoMovimentacao {
        ENTRADA, SAIDA, AJUSTE
    }
    
    // Construtores
    public MovimentacaoEstoque() {
        this.dataMovimentacao = LocalDateTime.now();
    }
    
    public MovimentacaoEstoque(Material material, TipoMovimentacao tipo, BigDecimal quantidade, 
                              String unidade, BigDecimal quantidadeAnterior, BigDecimal quantidadeAtual, 
                              String observacao) {
        this();
        this.material = material;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.unidade = unidade;
        this.quantidadeAnterior = quantidadeAnterior;
        this.quantidadeAtual = quantidadeAtual;
        this.observacao = observacao;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Material getMaterial() {
        return material;
    }
    
    public void setMaterial(Material material) {
        this.material = material;
    }
    
    public TipoMovimentacao getTipo() {
        return tipo;
    }
    
    public void setTipo(TipoMovimentacao tipo) {
        this.tipo = tipo;
    }
    
    public BigDecimal getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }
    
    public String getUnidade() {
        return unidade;
    }
    
    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }
    
    public BigDecimal getQuantidadeAnterior() {
        return quantidadeAnterior;
    }
    
    public void setQuantidadeAnterior(BigDecimal quantidadeAnterior) {
        this.quantidadeAnterior = quantidadeAnterior;
    }
    
    public BigDecimal getQuantidadeAtual() {
        return quantidadeAtual;
    }
    
    public void setQuantidadeAtual(BigDecimal quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }
    
    public String getObservacao() {
        return observacao;
    }
    
    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
    
    public LocalDateTime getDataMovimentacao() {
        return dataMovimentacao;
    }
    
    public void setDataMovimentacao(LocalDateTime dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
    }
} 