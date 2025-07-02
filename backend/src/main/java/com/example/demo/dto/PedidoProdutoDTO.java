package com.example.demo.dto;

import lombok.Data;

public record PedidoProdutoDTO (
    Long id,
    Integer produtoId,
    Integer quantidade ) {
} 