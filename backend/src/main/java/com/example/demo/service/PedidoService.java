package com.example.demo.service;

import com.example.demo.dto.PedidoDTO;
import com.example.demo.dto.PedidoReceitaDTO;
import com.example.demo.model.Pedido;
import com.example.demo.model.PedidoReceita;
import com.example.demo.model.Receita;
import com.example.demo.repository.PedidoRepository;
import com.example.demo.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ReceitaRepository receitaRepository;

    public List<PedidoDTO> findAll() {
        return pedidoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PedidoDTO> findById(Long id) {
        return pedidoRepository.findById(id).map(this::toDTO);
    }

    public PedidoDTO save(PedidoDTO pedidoDTO) {
        Pedido pedido = toEntity(pedidoDTO);
        // Calcular total do pedido
        BigDecimal total = BigDecimal.ZERO;
        if (pedido.getItens() != null) {
            for (PedidoReceita item : pedido.getItens()) {
                Receita receita = item.getReceita();
                if (receita != null) {
                    // Aqui você pode calcular o valor da receita se desejar
                    // Exemplo: total = total.add(receita.getPreco().multiply(new BigDecimal(item.getQuantidade())));
                }
            }
        }
        pedido.setTotal(total);
        Pedido saved = pedidoRepository.save(pedido);
        return toDTO(saved);
    }

    public PedidoDTO updateStatus(Long id, String status) {
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        pedido.setStatus(status);
        Pedido updated = pedidoRepository.save(pedido);
        return toDTO(updated);
    }

    public PedidoDTO update(Long id, PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        pedido.setNomeCliente(pedidoDTO.getNomeCliente());
        if (pedidoDTO.getStatus() != null) pedido.setStatus(pedidoDTO.getStatus());
        if (pedidoDTO.getItens() != null) {
            // Remove itens antigos e adiciona os novos
            pedido.getItens().clear();
            List<PedidoReceita> novosItens = pedidoDTO.getItens().stream().map(itemDTO -> {
                PedidoReceita item = new PedidoReceita();
                item.setPedido(pedido);
                if (itemDTO.getReceitaId() != null) {
                    Receita receita = receitaRepository.findById(itemDTO.getReceitaId()).orElse(null);
                    item.setReceita(receita);
                }
                item.setQuantidade(itemDTO.getQuantidade());
                return item;
            }).collect(Collectors.toList());
            pedido.getItens().addAll(novosItens);
        }
        Pedido atualizado = pedidoRepository.save(pedido);
        return toDTO(atualizado);
    }

    public void deleteById(Long id) {
        pedidoRepository.deleteById(id);
    }

    // Conversão Entity <-> DTO
    private PedidoDTO toDTO(Pedido pedido) {
        List<PedidoReceitaDTO> itens = null;
        if (pedido.getItens() != null) {
            itens = pedido.getItens().stream().map(this::toDTO).collect(Collectors.toList());
        }
        return new PedidoDTO(
                pedido.getId(),
                pedido.getNomeCliente(),
                pedido.getDataPedido(),
                pedido.getStatus(),
                pedido.getTotal(),
                itens
        );
    }

    private PedidoReceitaDTO toDTO(PedidoReceita item) {
        return new PedidoReceitaDTO(
                item.getId(),
                item.getReceita() != null ? item.getReceita().getId() : null,
                item.getReceita() != null ? item.getReceita().getNome() : null,
                item.getQuantidade()
        );
    }

    private Pedido toEntity(PedidoDTO dto) {
        Pedido pedido = new Pedido();
        pedido.setId(dto.getId());
        pedido.setNomeCliente(dto.getNomeCliente());
        if (dto.getDataPedido() != null) {
            pedido.setDataPedido(dto.getDataPedido());
        } else {
            pedido.setDataPedido(LocalDateTime.now());
        }
        if (dto.getStatus() != null) {
            pedido.setStatus(dto.getStatus());
        } else {
            pedido.setStatus("PENDENTE");
        }
        pedido.setTotal(dto.getTotal());
        if (dto.getItens() != null) {
            List<PedidoReceita> itens = dto.getItens().stream().map(itemDTO -> {
                PedidoReceita item = new PedidoReceita();
                item.setId(itemDTO.getId());
                item.setPedido(pedido);
                if (itemDTO.getReceitaId() != null) {
                    Receita receita = receitaRepository.findById(itemDTO.getReceitaId()).orElse(null);
                    item.setReceita(receita);
                }
                item.setQuantidade(itemDTO.getQuantidade());
                return item;
            }).collect(Collectors.toList());
            pedido.setItens(itens);
        }
        return pedido;
    }
} 
 