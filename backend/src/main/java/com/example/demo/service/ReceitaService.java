package com.example.demo.service;

import com.example.demo.dto.ReceitaDTO;
import com.example.demo.dto.ReceitaMaterialDTO;
import com.example.demo.model.Receita;
import com.example.demo.model.ReceitaMaterial;
import com.example.demo.model.enums.UnidadeMedida;
import com.example.demo.repository.MaterialRepository;
import com.example.demo.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReceitaService {
    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private MaterialRepository materialRepository;

    public List<ReceitaDTO> findAll() {
        return receitaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ReceitaDTO> findById(Long id) {
        return receitaRepository.findById(id)
                .map(this::convertToDTO);
    }

    public ReceitaDTO save(ReceitaDTO receitaDTO) {
        System.out.println("Entrou");
        Receita receita = convertToEntity(receitaDTO);
        Receita saved = receitaRepository.save(receita);
        System.out.println(saved);
        return convertToDTO(saved);
    }

    public ReceitaDTO update(Long id, ReceitaDTO receitaDTO) {
        Optional<Receita> existing = receitaRepository.findById(id);
        if (existing.isPresent()) {
            Receita receita = existing.get();
            receita.setDescricao(receitaDTO.descricao());
            // materiais não atualizados aqui (poderia ser implementado)
            Receita updated = receitaRepository.save(receita);
            return convertToDTO(updated);
        }
        throw new RuntimeException("Receita não encontrada com ID: " + id);
    }

    public void deleteById(Long id) {
        receitaRepository.deleteById(id);
    }

    private ReceitaDTO convertToDTO(Receita receita) {
        List<ReceitaMaterialDTO> materiaisDTO = null;
        BigDecimal custoTotal = BigDecimal.ZERO;
        if (receita.getMateriais() != null) {
            materiaisDTO = receita.getMateriais().stream()
                    .map(rm -> new ReceitaMaterialDTO(
                            rm.getMaterial() != null ? rm.getMaterial().getId() : null,
                            rm.getQuantidade(),
                            UnidadeMedida.fromCodigo(rm.getUnidade())
                    ))
                    .collect(Collectors.toList());

            for(ReceitaMaterial receitaMaterial : receita.getMateriais()) {
                BigDecimal valorPorcao = receitaMaterial.getMaterial().getValorPorcao();
                BigDecimal qtPorcao = BigDecimal.valueOf(receitaMaterial.getMaterial().getQtPorcao());
                BigDecimal quantidade = receitaMaterial.getQuantidade();

                BigDecimal resultado = valorPorcao
                        .divide(qtPorcao, 10, RoundingMode.HALF_UP)  // sempre defina a escala e o modo de arredondamento
                        .multiply(quantidade);

                custoTotal = custoTotal.add(resultado);
            }
        }

        return new ReceitaDTO(
                receita.getId(),
                receita.getDescricao(),
                materiaisDTO,
                custoTotal
        );
    }

//    private Receita convertToEntity(ReceitaDTO dto) {
//        Receita receita = new Receita();
//        receita.setId(dto.id());
//        receita.setDescricao(dto.descricao());
//        // materiais não convertidos aqui (poderia ser implementado)
//        return receita;
//    }

    private Receita convertToEntity(ReceitaDTO dto) {
        Receita receita = new Receita();
        receita.setId(dto.id());
        receita.setDescricao(dto.descricao());

        if (dto.materiais() != null && !dto.materiais().isEmpty()) {
            List<ReceitaMaterial> materiais = dto.materiais().stream().map(rmDTO -> {
                ReceitaMaterial rm = new ReceitaMaterial();

                // Buscar material existente
                materialRepository.findById(rmDTO.materialId()).ifPresentOrElse(material -> {
                    rm.setMaterial(material);
                }, () -> {
                    throw new RuntimeException("Material não encontrado com ID: " + rmDTO.materialId());
                });

                rm.setQuantidade(rmDTO.quantidade());
                rm.setUnidade(rmDTO.unidade().getCodigo()); // Supondo que getCodigo retorna String/char
                rm.setReceita(receita); // vínculo com a receita atual

                return rm;
            }).collect(Collectors.toList());

            receita.setMateriais(materiais);
        }

        return receita;
    }
} 