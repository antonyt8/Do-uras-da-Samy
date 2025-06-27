"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface Material {
  id: string;
  nome: string;
  unidade: string;
  precoUnitario: number;
}

interface ReceitaMaterial {
  materialId: string;
  quantidade: number;
  unidade: string;
}

interface Receita {
  id: string | number;
  nome: string;
  descricao: string;
  tempoPreparo: number;
  rendimento: string;
  dataCriacao: string;
  visualizacoes: number;
  materiais: { materialId: string | number; quantidade: number; unidade: string }[];
}

interface ReceitaTableProps {
  receitas: Receita[];
  materiais: Material[];
  onEdit: (receita: Receita) => void;
  onDelete: (id: string | number) => void;
  onView: (receita: Receita) => void;
}

export default function ReceitaTable({ receitas, materiais, onEdit, onDelete, onView }: ReceitaTableProps) {
  if (!receitas) {
    return <div className="text-center text-gray-500">Carregando receitas...</div>;
  }
  if (receitas.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <span className="text-6xl mb-4 block">🍰</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma receita cadastrada</h3>
        <p className="text-gray-600 mb-4">Comece criando sua primeira receita para calcular custos e gerenciar ingredientes</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#FFF8F0] border border-[#F6E3B4] rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-[#F6E3B4] text-[#7A5C3D]">
            <th className="px-6 py-3 border-b font-semibold text-lg">Nome</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Descrição</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Tempo Preparo</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Rendimento</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Data Criação</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Visualizações</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Ingredientes</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((receita, idx) => (
            <tr key={receita.id} className={
              `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF3E3]'} hover:bg-[#F7C5CC]/40`
            }>
              <td className="px-6 py-3 border-b text-gray-900 font-medium whitespace-nowrap">{receita.nome}</td>
              <td className="px-6 py-3 border-b max-w-xs truncate" title={receita.descricao}>{receita.descricao}</td>
              <td className="px-6 py-3 border-b">{receita.tempoPreparo} min</td>
              <td className="px-6 py-3 border-b">{receita.rendimento}</td>
              <td className="px-6 py-3 border-b">{new Date(receita.dataCriacao).toLocaleDateString()}</td>
              <td className="px-6 py-3 border-b">{receita.visualizacoes}</td>
              <td className="px-6 py-3 border-b text-center">{receita.materiais?.length || 0} ingrediente{receita.materiais?.length === 1 ? '' : 's'}</td>
              <td className="px-6 py-3 border-b flex gap-2 items-center">
                <button
                  onClick={() => onView(receita)}
                  className="p-2 rounded hover:bg-green-100 text-green-600 transition"
                  title="Ver detalhes"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => onEdit(receita)}
                  className="p-2 rounded hover:bg-blue-100 text-blue-600 transition"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(receita.id)}
                  className="p-2 rounded hover:bg-red-100 text-red-600 transition"
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
