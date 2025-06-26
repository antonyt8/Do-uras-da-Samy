package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "receitas")
public class Receita {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(columnDefinition = "TEXT")
    private String instrucoes;
    
    @Column(name = "tempo_preparo")
    private Integer tempoPreparo;
    
    @Column(nullable = false)
    private String rendimento;
    
    @Column(name = "data_criacao", nullable = false)
    private LocalDate dataCriacao;
    
    @Column(nullable = false)
    private Integer visualizacoes;
    
    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReceitaMaterial> materiais;
    
    // Construtores
    public Receita() {
        this.visualizacoes = 0;
        this.dataCriacao = LocalDate.now();
    }
    
    public Receita(String nome, String descricao, String instrucoes, Integer tempoPreparo, String rendimento) {
        this();
        this.nome = nome;
        this.descricao = descricao;
        this.instrucoes = instrucoes;
        this.tempoPreparo = tempoPreparo;
        this.rendimento = rendimento;
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
    
    public String getInstrucoes() {
        return instrucoes;
    }
    
    public void setInstrucoes(String instrucoes) {
        this.instrucoes = instrucoes;
    }
    
    public Integer getTempoPreparo() {
        return tempoPreparo;
    }
    
    public void setTempoPreparo(Integer tempoPreparo) {
        this.tempoPreparo = tempoPreparo;
    }
    
    public String getRendimento() {
        return rendimento;
    }
    
    public void setRendimento(String rendimento) {
        this.rendimento = rendimento;
    }
    
    public LocalDate getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public Integer getVisualizacoes() {
        return visualizacoes;
    }
    
    public void setVisualizacoes(Integer visualizacoes) {
        this.visualizacoes = visualizacoes;
    }
    
    public List<ReceitaMaterial> getMateriais() {
        return materiais;
    }
    
    public void setMateriais(List<ReceitaMaterial> materiais) {
        this.materiais = materiais;
    }
    
    public void incrementarVisualizacoes() {
        this.visualizacoes++;
    }
} 