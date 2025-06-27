import React from "react";

interface Material {
  id: string | number;
  nome: string;
  descricao: string;
  categoria: string;
  unidade: string;
  precoUnitario: number;
  fornecedor: string;
  estoqueAtual: number;
  estoqueMinimo: number;
}

interface MaterialDetailProps {
  material: Material;
  onClose: () => void;
}

export default function MaterialDetail({ material, onClose }: MaterialDetailProps) {
  const isLowStock = material.estoqueAtual <= material.estoqueMinimo;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{material.nome}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            title="Fechar"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-gray-500">Categoria</span>
              <span className="font-medium text-gray-800">{material.categoria}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Unidade</span>
              <span className="font-medium text-gray-800">{material.unidade}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Preço Unitário</span>
              <span className="font-medium text-gray-800">R$ {material.precoUnitario.toFixed(2)}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Fornecedor</span>
              <span className="font-medium text-gray-800">{material.fornecedor}</span>
            </div>
          </div>
          <div>
            <span className="block text-xs text-gray-500">Descrição</span>
            <span className="text-gray-700">{material.descricao || <span className="italic text-gray-400">Sem descrição</span>}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-gray-500">Estoque Atual</span>
              <span className={`font-bold text-lg ${isLowStock ? "text-red-600" : "text-gray-900"}`}>{material.estoqueAtual}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Estoque Mínimo</span>
              <span className="font-bold text-lg text-gray-900">{material.estoqueMinimo}</span>
            </div>
          </div>
          {isLowStock && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded p-3 text-center font-semibold">
              ⚠️ Estoque abaixo do mínimo!
            </div>
          )}
          {/* Espaço para histórico de movimentações de estoque no futuro */}
          <div className="mt-6">
            <span className="block text-xs text-gray-500 mb-2">Histórico de Movimentações</span>
            <div className="bg-gray-50 border border-gray-200 rounded p-4 text-gray-400 text-center italic">
              Em breve: histórico de movimentações de estoque deste material.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 