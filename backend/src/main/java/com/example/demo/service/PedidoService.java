package com.example.demo.service;

import com.example.demo.dto.PedidoDTO;
import com.example.demo.dto.PedidoProdutoDTO;
import com.example.demo.model.Pedido;
import com.example.demo.model.PedidoProduto;
import com.example.demo.model.Produto;
import com.example.demo.model.Receita;
import com.example.demo.repository.PedidoRepository;
import com.example.demo.repository.ProdutoRepository;
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
    @Autowired
    private ProdutoRepository produtoRepository;

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

        BigDecimal total = BigDecimal.ZERO;
        if (pedido.getItens() != null) {
            for (PedidoProduto item : pedido.getItens()) {
                total = total.add(item.getProduto().getPrecoSugerido().multiply(new BigDecimal(item.getQuantidade())));
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
        pedido.setNomeCliente(pedidoDTO.nomeCliente());
        if (pedidoDTO.status() != null) pedido.setStatus(pedidoDTO.status());
        if (pedidoDTO.itens() != null) {
            // Remove itens antigos e adiciona os novos
            pedido.getItens().clear();
            List<PedidoProduto> novosItens = pedidoDTO.itens().stream().map(itemDTO -> {
                PedidoProduto item = new PedidoProduto();
                item.setPedido(pedido);
//                if (itemDTO.getReceitaId() != null) {
//                    Receita receita = receitaRepository.findById(itemDTO.getReceitaId()).orElse(null);
//                    item.setReceita(receita);
//                }
                item.setQuantidade(itemDTO.quantidade());
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
        List<PedidoProdutoDTO> itens = null;
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

    private PedidoProdutoDTO toDTO(PedidoProduto item) {
        return new PedidoProdutoDTO(
                item.getId(),
                item.getPedido().getId(),
                item.getQuantidade()
        );
    }

    private Pedido toEntity(PedidoDTO dto) {
        Pedido pedido = new Pedido();
        pedido.setId(dto.id());
        pedido.setNomeCliente(dto.nomeCliente());
        if (dto.dataPedido() != null) {
            pedido.setDataPedido(dto.dataPedido());
        } else {
            pedido.setDataPedido(LocalDateTime.now());
        }
        if (dto.status() != null) {
            pedido.setStatus(dto.status());
        } else {
            pedido.setStatus("PENDENTE");
        }
        pedido.setTotal(dto.total());
        if (dto.itens() != null) {
            List<PedidoProduto> itens = dto.itens().stream().map(itemDTO -> {
                PedidoProduto item = new PedidoProduto();
                item.setId(itemDTO.id());
                item.setPedido(pedido);
                if (itemDTO.produtoId() != null) {
                    Produto produto = produtoRepository.findById(itemDTO.produtoId()).orElse(null);
                    item.setProduto(produto);
                }
                item.setQuantidade(itemDTO.quantidade());
                return item;
            }).collect(Collectors.toList());
            pedido.setItens(itens);
        }
        return pedido;
    }
} 
 