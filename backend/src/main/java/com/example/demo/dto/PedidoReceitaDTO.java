package com.example.demo.dto;

public class PedidoReceitaDTO {
    private Long id;
    private Long receitaId;
    private String receitaNome;
    private Integer quantidade;

    public PedidoReceitaDTO() {}

    public PedidoReceitaDTO(Long id, Long receitaId, String receitaNome, Integer quantidade) {
        this.id = id;
        this.receitaId = receitaId;
        this.receitaNome = receitaNome;
        this.quantidade = quantidade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getReceitaId() { return receitaId; }
    public void setReceitaId(Long receitaId) { this.receitaId = receitaId; }
    public String getReceitaNome() { return receitaNome; }
    public void setReceitaNome(String receitaNome) { this.receitaNome = receitaNome; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
} 