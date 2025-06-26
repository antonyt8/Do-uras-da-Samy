package com.example.demo.repository;

import com.example.demo.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    
    List<Receita> findByNomeContainingIgnoreCase(String nome);
    
    @Query("SELECT r FROM Receita r ORDER BY r.visualizacoes DESC")
    List<Receita> findReceitasMaisPopulares();
    
    @Query("SELECT r FROM Receita r ORDER BY r.dataCriacao DESC")
    List<Receita> findReceitasRecentes();
    
    @Query("SELECT r FROM Receita r WHERE r.nome LIKE %:termo% OR r.descricao LIKE %:termo%")
    List<Receita> findByNomeOuDescricaoContaining(@Param("termo") String termo);
    
    @Query("SELECT COUNT(r) FROM Receita r")
    Long contarTotalReceitas();
    
    @Query("SELECT AVG(r.visualizacoes) FROM Receita r")
    Double calcularMediaVisualizacoes();
} 