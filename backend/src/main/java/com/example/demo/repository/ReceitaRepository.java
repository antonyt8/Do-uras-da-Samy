package com.example.demo.repository;

import com.example.demo.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    
    List<Receita> findByDescricaoContainingIgnoreCase(String nome);
    
    @Query("SELECT r FROM Receita r ORDER BY r.dataCriacao DESC")
    List<Receita> findReceitasRecentes();
    
    @Query("SELECT r FROM Receita r WHERE r.descricao LIKE %:termo%")
    List<Receita> findByDescricaoContaining(@Param("termo") String termo);
    
    @Query("SELECT COUNT(r) FROM Receita r")
    Long contarTotalReceitas();
} 