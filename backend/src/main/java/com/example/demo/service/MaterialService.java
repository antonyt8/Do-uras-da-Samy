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
            material.setNome(materialDTO.getNome());
            material.setDescricao(materialDTO.getDescricao());
            material.setCategoria(materialDTO.getCategoria());
            material.setUnidade(materialDTO.getUnidade());
            material.setPrecoUnitario(materialDTO.getPrecoUnitario());
            material.setFornecedor(materialDTO.getFornecedor());
            material.setEstoqueMinimo(materialDTO.getEstoqueMinimo());
            
            Material updatedMaterial = materialRepository.save(material);
            return convertToDTO(updatedMaterial);
        }
        throw new RuntimeException("Material não encontrado com ID: " + id);
    }
    
    public void deleteById(Long id) {
        materialRepository.deleteById(id);
    }
    
    public List<MaterialDTO> findByCategoria(String categoria) {
        return materialRepository.findByCategoria(categoria).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<MaterialDTO> findMateriaisComEstoqueBaixo() {
        return materialRepository.findMateriaisComEstoqueBaixo().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<MaterialDTO> findMateriaisSemEstoque() {
        return materialRepository.findMateriaisSemEstoque().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<MaterialDTO> findByNomeOuDescricaoContaining(String termo) {
        return materialRepository.findByNomeOuDescricaoContaining(termo).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public BigDecimal calcularValorTotalEstoque() {
        BigDecimal valor = materialRepository.calcularValorTotalEstoque();
        return valor != null ? valor : BigDecimal.ZERO;
    }
    
    public void atualizarEstoque(Long materialId, BigDecimal novaQuantidade) {
        Optional<Material> materialOpt = materialRepository.findById(materialId);
        if (materialOpt.isPresent()) {
            Material material = materialOpt.get();
            material.setEstoqueAtual(novaQuantidade);
            materialRepository.save(material);
        } else {
            throw new RuntimeException("Material não encontrado com ID: " + materialId);
        }
    }
    
    private MaterialDTO convertToDTO(Material material) {
        return new MaterialDTO(
                material.getId(),
                material.getNome(),
                material.getDescricao(),
                material.getCategoria(),
                material.getUnidade(),
                material.getPrecoUnitario(),
                material.getFornecedor(),
                material.getEstoqueAtual(),
                material.getEstoqueMinimo()
        );
    }
    
    private Material convertToEntity(MaterialDTO materialDTO) {
        Material material = new Material();
        material.setId(materialDTO.getId());
        material.setNome(materialDTO.getNome());
        material.setDescricao(materialDTO.getDescricao());
        material.setCategoria(materialDTO.getCategoria());
        material.setUnidade(materialDTO.getUnidade());
        material.setPrecoUnitario(materialDTO.getPrecoUnitario());
        material.setFornecedor(materialDTO.getFornecedor());
        material.setEstoqueAtual(materialDTO.getEstoqueAtual() != null ? materialDTO.getEstoqueAtual() : BigDecimal.ZERO);
        material.setEstoqueMinimo(materialDTO.getEstoqueMinimo() != null ? materialDTO.getEstoqueMinimo() : BigDecimal.ZERO);
        return material;
    }
} 