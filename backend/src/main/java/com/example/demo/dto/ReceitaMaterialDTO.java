package com.example.demo.dto;

import com.example.demo.model.enums.UnidadeMedida;

import java.math.BigDecimal;

public record ReceitaMaterialDTO (
    Long materialId,
    BigDecimal quantidade,
    UnidadeMedida unidade) {
}