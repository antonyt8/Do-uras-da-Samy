// ProdutoTable.tsx
"use client";

import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface Produto {
  id: string;
  descricao: string;
//   receitaNome: string;
//   custoTotal: number;
//   margemLucro: number;
  precoSugerido: number;
}

interface ProdutoTableProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: string) => void;
  onView: (produto: Produto) => void;
}

export default function ProdutoTable({ produtos, onEdit, onDelete, onView }: ProdutoTableProps) {
  if (!produtos) {
    return <div className="text-center text-gray-500">Carregando produtos...</div>;
  }
  if (produtos.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <span className="text-6xl mb-4 block">🧁</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto cadastrado</h3>
        <p className="text-gray-600 mb-4">Comece criando seu primeiro produto para definir preços e margens de lucro</p>
      </div>
    );
  }

    const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#FFF8F0] border border-[#F6E3B4] rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-[#F6E3B4] text-[#7A5C3D]">
            <th className="px-6 py-3 border-b font-semibold text-lg">Produto</th>
            {/* <th className="px-6 py-3 border-b font-semibold text-lg">Receita</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Custo</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Margem</th> */}
            <th className="px-6 py-3 border-b font-semibold text-lg">Preço Sugerido</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, idx) => (
            <tr key={produto.id} className={
              `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF3E3]'} hover:bg-[#F7C5CC]/40`
            }>
              <td className="px-6 py-3 border-b max-w-xs truncate" title={produto.descricao}>{produto.descricao}</td>
              {/* <td className="px-6 py-3 border-b text-center" title={produto.receitaNome}>{produto.receitaNome}</td>
              <td className="px-6 py-3 border-b text-center">{formatCurrency(produto.custoTotal)}</td>
              <td className="px-6 py-3 border-b text-center">{produto.margemLucro}%</td> */}
              <td className="px-6 py-3 border-b text-center font-bold">{formatCurrency(produto.precoSugerido)}</td>
              <td className="px-6 py-3 border-b flex gap-2 items-center">
                <button
                  onClick={() => onView(produto)}
                  className="p-2 rounded hover:bg-green-100 text-green-600 transition"
                  title="Ver detalhes"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => onEdit(produto)}
                  className="p-2 rounded hover:bg-blue-100 text-blue-600 transition"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(produto.id)}
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
