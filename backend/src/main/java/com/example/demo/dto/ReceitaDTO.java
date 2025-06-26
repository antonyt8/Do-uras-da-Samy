package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

public class ReceitaDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String instrucoes;
    private Integer tempoPreparo;
    private String rendimento;
    private LocalDate dataCriacao;
    private Integer visualizacoes;
    private List<ReceitaMaterialDTO> materiais;
    
    // Construtores
    public ReceitaDTO() {}
    
    public ReceitaDTO(Long id, String nome, String descricao, String instrucoes, Integer tempoPreparo,
                     String rendimento, LocalDate dataCriacao, Integer visualizacoes, List<ReceitaMaterialDTO> materiais) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.instrucoes = instrucoes;
        this.tempoPreparo = tempoPreparo;
        this.rendimento = rendimento;
        this.dataCriacao = dataCriacao;
        this.visualizacoes = visualizacoes;
        this.materiais = materiais;
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
    
    public List<ReceitaMaterialDTO> getMateriais() {
        return materiais;
    }
    
    public void setMateriais(List<ReceitaMaterialDTO> materiais) {
        this.materiais = materiais;
    }
} 