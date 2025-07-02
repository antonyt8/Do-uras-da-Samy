package com.example.demo.dto;

import com.example.demo.model.MovimentacaoEstoque;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class MovimentacaoEstoqueRequestDTO {

    private Integer produtoId;
    private MovimentacaoEstoque.TipoMovimentacao tipo;
    private BigDecimal quantidade;
    private String observacao;

}
