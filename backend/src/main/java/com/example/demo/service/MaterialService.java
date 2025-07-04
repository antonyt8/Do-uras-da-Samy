package com.example.demo.service;

import com.example.demo.dto.MaterialDTO;
import com.example.demo.model.Material;
import com.example.demo.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MaterialService {
    
    @Autowired
    private MaterialRepository materialRepository;
    
    public List<MaterialDTO> findAll() {
        return materialRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<MaterialDTO> findById(Long id) {
        return materialRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public MaterialDTO save(MaterialDTO materialDTO) {
        Material material = convertToEntity(materialDTO);
        Material savedMaterial = materialRepository.save(material);
        return convertToDTO(savedMaterial);
    }
    
    public MaterialDTO update(Long id, MaterialDTO materialDTO) {
        Optional<Material> existingMaterial = materialRepository.findById(id);
        if (existingMaterial.isPresent()) {
            Material material = existingMaterial.get();
            material.setDescricao(materialDTO.descricao());
            material.setQtPorcao(materialDTO.qtPorcao());

            
            Material updatedMaterial = materialRepository.save(material);
            return convertToDTO(updatedMaterial);
        }
        throw new RuntimeException("Material não encontrado com ID: " + id);
    }
    
    public void deleteById(Long id) {
        materialRepository.deleteById(id);
    }
    

    public BigDecimal calcularValorTotalEstoque() {
        BigDecimal valor = null;
        return valor != null ? valor : BigDecimal.ZERO;
    }
    
    public void atualizarEstoque(Long materialId, BigDecimal novaQuantidade) {
        Optional<Material> materialOpt = materialRepository.findById(materialId);
        if (materialOpt.isPresent()) {
            Material material = materialOpt.get();
            materialRepository.save(material);
        } else {
            throw new RuntimeException("Material não encontrado com ID: " + materialId);
        }
    }
    
    private MaterialDTO convertToDTO(Material material) {
        return new MaterialDTO(
                material.getId(),
                material.getDescricao(),
                material.getQtPorcao(),
                material.getUnidadeMedida(),
                material.getValorPorcao()
        );
    }
    
    private Material convertToEntity(MaterialDTO materialDTO) {
        Material material = new Material();
        material.setId(materialDTO.id());
        material.setDescricao(materialDTO.descricao());
        material.setQtPorcao(materialDTO.qtPorcao());
        material.setUnidadeMedida(materialDTO.unidadeMedida());
        material.setValorPorcao(materialDTO.vlPorcao());
        return material;
    }
} 