package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "receita_materiais")
public class ReceitaMaterial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receita_id", nullable = false)
    private Receita receita;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantidade;
    
    @Column(nullable = false)
    private String unidade;
    
    // Construtores
    public ReceitaMaterial() {}
    
    public ReceitaMaterial(Receita receita, Material material, BigDecimal quantidade, String unidade) {
        this.receita = receita;
        this.material = material;
        this.quantidade = quantidade;
        this.unidade = unidade;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Receita getReceita() {
        return receita;
    }
    
    public void setReceita(Receita receita) {
        this.receita = receita;
    }
    
    public Material getMaterial() {
        return material;
    }
    
    public void setMaterial(Material material) {
        this.material = material;
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
} 