package com.example.demo.repository;

import com.example.demo.model.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Long> {
    
    List<MovimentacaoEstoque> findByMaterialIdOrderByDataMovimentacaoDesc(Long materialId);
    
    List<MovimentacaoEstoque> findByTipoOrderByDataMovimentacaoDesc(MovimentacaoEstoque.TipoMovimentacao tipo);
    
    @Query("SELECT me FROM MovimentacaoEstoque me WHERE me.dataMovimentacao BETWEEN :inicio AND :fim ORDER BY me.dataMovimentacao DESC")
    List<MovimentacaoEstoque> findByPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
    
    @Query("SELECT me FROM MovimentacaoEstoque me WHERE me.material.id = :materialId AND me.dataMovimentacao BETWEEN :inicio AND :fim ORDER BY me.dataMovimentacao DESC")
    List<MovimentacaoEstoque> findByMaterialAndPeriodo(@Param("materialId") Long materialId, 
                                                       @Param("inicio") LocalDateTime inicio, 
                                                       @Param("fim") LocalDateTime fim);
} 