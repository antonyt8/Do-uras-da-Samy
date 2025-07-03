package com.example.demo.dto;

import com.example.demo.model.enums.UnidadeMedida;

import java.math.BigDecimal;

public record MaterialDTO (
        Long id,
        String descricao,
        Integer qtPorcao,
        UnidadeMedida unidadeMedida,
        BigDecimal vlPorcao) {
}