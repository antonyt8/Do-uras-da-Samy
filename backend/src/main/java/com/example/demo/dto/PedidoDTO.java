package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoDTO {
    private Long id;
    private String nomeCliente;
    private LocalDateTime dataPedido;
    private String status;
    private BigDecimal total;
    private List<PedidoReceitaDTO> itens;

    public PedidoDTO() {}

    public PedidoDTO(Long id, String nomeCliente, LocalDateTime dataPedido, String status, BigDecimal total, List<PedidoReceitaDTO> itens) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.dataPedido = dataPedido;
        this.status = status;
        this.total = total;
        this.itens = itens;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomeCliente() { return nomeCliente; }
    public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }
    public LocalDateTime getDataPedido() { return dataPedido; }
    public void setDataPedido(LocalDateTime dataPedido) { this.dataPedido = dataPedido; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public List<PedidoReceitaDTO> getItens() { return itens; }
    public void setItens(List<PedidoReceitaDTO> itens) { this.itens = itens; }
} 