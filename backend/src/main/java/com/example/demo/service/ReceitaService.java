package com.example.demo.service;

import com.example.demo.dto.ReceitaDTO;
import com.example.demo.dto.ReceitaMaterialDTO;
import com.example.demo.model.Receita;
import com.example.demo.model.ReceitaMaterial;
import com.example.demo.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReceitaService {
    @Autowired
    private ReceitaRepository receitaRepository;

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
        Receita receita = convertToEntity(receitaDTO);
        Receita saved = receitaRepository.save(receita);
        return convertToDTO(saved);
    }

    public ReceitaDTO update(Long id, ReceitaDTO receitaDTO) {
        Optional<Receita> existing = receitaRepository.findById(id);
        if (existing.isPresent()) {
            Receita receita = existing.get();
            receita.setNome(receitaDTO.getNome());
            receita.setDescricao(receitaDTO.getDescricao());
            receita.setInstrucoes(receitaDTO.getInstrucoes());
            receita.setTempoPreparo(receitaDTO.getTempoPreparo());
            receita.setRendimento(receitaDTO.getRendimento());
            receita.setDataCriacao(receitaDTO.getDataCriacao());
            receita.setVisualizacoes(receitaDTO.getVisualizacoes());
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
        if (receita.getMateriais() != null) {
            materiaisDTO = receita.getMateriais().stream()
                    .map(rm -> new ReceitaMaterialDTO(
                            rm.getId(),
                            rm.getMaterial() != null ? rm.getMaterial().getId() : null,
                            rm.getMaterial() != null ? rm.getMaterial().getNome() : null,
                            rm.getQuantidade(),
                            rm.getUnidade(),
                            rm.getMaterial() != null ? rm.getMaterial().getPrecoUnitario() : null
                    ))
                    .collect(Collectors.toList());
        }
        return new ReceitaDTO(
                receita.getId(),
                receita.getNome(),
                receita.getDescricao(),
                receita.getInstrucoes(),
                receita.getTempoPreparo(),
                receita.getRendimento(),
                receita.getDataCriacao(),
                receita.getVisualizacoes(),
                materiaisDTO
        );
    }

    private Receita convertToEntity(ReceitaDTO dto) {
        Receita receita = new Receita();
        receita.setId(dto.getId());
        receita.setNome(dto.getNome());
        receita.setDescricao(dto.getDescricao());
        receita.setInstrucoes(dto.getInstrucoes());
        receita.setTempoPreparo(dto.getTempoPreparo());
        receita.setRendimento(dto.getRendimento());
        receita.setDataCriacao(dto.getDataCriacao());
        receita.setVisualizacoes(dto.getVisualizacoes() != null ? dto.getVisualizacoes() : 0);
        // materiais não convertidos aqui (poderia ser implementado)
        return receita;
    }
} 