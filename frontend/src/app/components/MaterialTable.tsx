"use client";

import { useState, useEffect } from "react";

interface Material {
  id: string | number;
  descricao: string;
  qtPorcao: string;
  unidadeMedida: string;
  vlPorcao: number
}

interface Props {
  materiais: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: string | number) => void;
  onView: (material: Material) => void;
}

export default function MaterialTable({ materiais, onEdit, onDelete, onView }: Props) {
  if (!materiais) {
    return <div className="text-center text-gray-500">Carregando materiais...</div>;
  }
  if (materiais.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <span className="text-6xl mb-4 block">📦</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum material cadastrado</h3>
        <p className="text-gray-600 mb-4">Comece cadastrando seu primeiro material</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#FFF8F0] border border-[#F6E3B4] rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-[#F6E3B4] text-[#7A5C3D]">
            <th className="px-6 py-3 border-b font-semibold text-lg">Nome</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Qtd. Porção</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Unidade</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Valor Porção</th>
            <th className="px-6 py-3 border-b font-semibold text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((material, idx) => (
            <tr key={material.id} className={
              `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF3E3]'} hover:bg-[#F7C5CC]/40 cursor-pointer`
            } onClick={e => {
              if ((e.target as HTMLElement).tagName === 'BUTTON') return;
              onView(material);
            }}>
              <td className="px-6 py-3 border-b text-gray-900">{material.descricao}</td>
              <td className="px-6 py-3 border-b text-gray-700">{material.qtPorcao}</td>
              <td className="px-6 py-3 border-b text-gray-700">{material.unidadeMedida}</td>
              <td className="px-6 py-3 border-b text-gray-700">R$ {material.vlPorcao}</td>
              <td className="px-6 py-3 border-b">
                <button
                  onClick={e => { e.stopPropagation(); onEdit(material); }}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={e => { e.stopPropagation(); onDelete(material.id); }}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 