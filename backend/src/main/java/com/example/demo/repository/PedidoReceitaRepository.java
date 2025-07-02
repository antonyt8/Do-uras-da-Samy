package com.example.demo.repository;

import com.example.demo.model.PedidoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoReceitaRepository extends JpaRepository<PedidoProduto, Long> {
} 