package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "receitas")
@Data
public class Receita {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "data_criacao", nullable = false)
    private LocalDate dataCriacao;
    
    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReceitaMaterial> materiais;
    
    // Construtores
    public Receita() {
        this.dataCriacao = LocalDate.now();
    }
} 