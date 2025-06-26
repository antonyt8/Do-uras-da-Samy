package com.example.demo.dto;

import java.math.BigDecimal;

public class ReceitaMaterialDTO {
    private Long id;
    private Long materialId;
    private String materialNome;
    private BigDecimal quantidade;
    private String unidade;
    private BigDecimal precoUnitario;
    
    // Construtores
    public ReceitaMaterialDTO() {}
    
    public ReceitaMaterialDTO(Long id, Long materialId, String materialNome, BigDecimal quantidade, 
                             String unidade, BigDecimal precoUnitario) {
        this.id = id;
        this.materialId = materialId;
        this.materialNome = materialNome;
        this.quantidade = quantidade;
        this.unidade = unidade;
        this.precoUnitario = precoUnitario;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getMaterialId() {
        return materialId;
    }
    
    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }
    
    public String getMaterialNome() {
        return materialNome;
    }
    
    public void setMaterialNome(String materialNome) {
        this.materialNome = materialNome;
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
    
    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }
    
    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
} 