package com.example.demo.dto;

import com.example.demo.model.MovimentacaoEstoque;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MovimentacaoEstoqueResponseDTO {

    private Long id;
    private Integer produtoId;
    private MovimentacaoEstoque.TipoMovimentacao tipo;
    private BigDecimal quantidade;
    private BigDecimal quantidadeAnterior;
    private BigDecimal quantidadeAtual;
    private String observacao;
    private LocalDateTime dataMovimentacao;

}
