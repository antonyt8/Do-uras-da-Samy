package com.example.demo.model;

import com.example.demo.model.enums.UnidadeMaterialConverter;
import com.example.demo.model.enums.UnidadeMedida;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "materiais")
@Data
public class Material {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "QT_PORCAO", nullable = false)
    private Integer qtPorcao;

    @Column(name = "VL_PORCAO", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorPorcao;

    @Convert(converter = UnidadeMaterialConverter.class)
    @Column(name = "TP_UNIDADE_MEDIDA", nullable = false, length = 1)
    private UnidadeMedida unidadeMedida;
} 