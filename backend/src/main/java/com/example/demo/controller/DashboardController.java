package com.example.demo.controller;

import com.example.demo.repository.MaterialRepository;
import com.example.demo.repository.ReceitaRepository;
import com.example.demo.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private ReceitaRepository receitaRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMateriais", materialRepository.count());
        stats.put("totalReceitas", receitaRepository.count());
        stats.put("totalPedidos", pedidoRepository.count());
        stats.put("valorTotalEstoque", materialRepository.calcularValorTotalEstoque());
        stats.put("materiaisBaixoEstoque", materialRepository.findMateriaisComEstoqueBaixo().size());
        stats.put("receitasPopulares", receitaRepository.findReceitasMaisPopulares().stream().limit(3).toList());
        stats.put("pedidosRecentes", pedidoRepository.findAll().stream().sorted((a, b) -> b.getDataPedido().compareTo(a.getDataPedido())).limit(5).toList());
        // Adicione mais estatísticas conforme necessário
        return stats;
    }
} 