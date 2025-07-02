package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDTO (
    Integer id,
    String nomeCliente,
    LocalDateTime dataPedido,
    String status,
    BigDecimal total,
    List<PedidoProdutoDTO> itens) {
} 