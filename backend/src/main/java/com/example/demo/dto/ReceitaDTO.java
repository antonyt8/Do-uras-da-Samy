package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record ReceitaDTO (
    Long id,
    String descricao,
    List<ReceitaMaterialDTO> materiais,
    BigDecimal custoTotal) {
}