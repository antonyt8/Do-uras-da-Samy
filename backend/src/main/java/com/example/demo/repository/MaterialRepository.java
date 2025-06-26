package com.example.demo.repository;

import com.example.demo.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    
    List<Material> findByCategoria(String categoria);
    
    List<Material> findByFornecedor(String fornecedor);
    
    @Query("SELECT m FROM Material m WHERE m.estoqueAtual <= m.estoqueMinimo")
    List<Material> findMateriaisComEstoqueBaixo();
    
    @Query("SELECT m FROM Material m WHERE m.estoqueAtual = 0")
    List<Material> findMateriaisSemEstoque();
    
    @Query("SELECT m FROM Material m WHERE m.nome LIKE %:termo% OR m.descricao LIKE %:termo%")
    List<Material> findByNomeOuDescricaoContaining(@Param("termo") String termo);
    
    @Query("SELECT SUM(m.estoqueAtual * m.precoUnitario) FROM Material m")
    BigDecimal calcularValorTotalEstoque();
    
    @Query("SELECT m.categoria, SUM(m.estoqueAtual * m.precoUnitario) FROM Material m GROUP BY m.categoria")
    List<Object[]> calcularValorPorCategoria();
} 