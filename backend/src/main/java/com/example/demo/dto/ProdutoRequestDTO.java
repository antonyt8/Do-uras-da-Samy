package com.example.demo.dto;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        String descricao,
        Long quantidadeProduzida,
        BigDecimal custoUnitario,
        Integer margemLucro,
        BigDecimal precoSugerido,
        Long receitaId) {
}