package com.example.demo.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UnidadeMedida {
    GRAMAS("G", "GRAMAS"),
    LITRO("L", "LITRO"),
    UNIDADE("U", "UNIDADE"),
    CAIXA("C", "CAIXA");

    private final String codigo;
    private final String descricao;

    UnidadeMedida(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    // Método que será usado para serializar o valor no JSON (retorna a descrição
    // como "CAIXA")
    @JsonValue
    public String toJson() {
        return descricao;
    }

    // Método para converter a string da descrição ("CAIXA", "LITRO", etc.) para o
    // código
    public static UnidadeMedida fromString(String descricao) {
        for (UnidadeMedida um : UnidadeMedida.values()) {
            if (um.descricao.equalsIgnoreCase(descricao)) {
                return um;
            }
        }
        throw new IllegalArgumentException("Valor inválido para UnidadeMedida: " + descricao);
    }

    // Método para retornar o código armazenado no banco
    public static UnidadeMedida fromCodigo(String codigo) {
        for (UnidadeMedida um : UnidadeMedida.values()) {
            if (um.codigo.equalsIgnoreCase(codigo)) {
                return um;
            }
        }
        throw new IllegalArgumentException("Código inválido para UnidadeMedida: " + codigo);
    }
}
