package com.example.demo.model.enums;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class UnidadeMaterialConverter implements AttributeConverter<UnidadeMedida, String> {

    @Override
    public String convertToDatabaseColumn(UnidadeMedida category) {
        if (category == null) {
            return null;
        }
        return category.getCodigo();
    }

    @Override
    public UnidadeMedida convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(UnidadeMedida.values())
                .filter(c -> c.getCodigo().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}