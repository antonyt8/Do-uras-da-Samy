"use client";

import { useState } from "react";

interface Material {
  id: string;
  nome: string;
  categoria: string;
  unidade: string;
  precoUnitario: number;
  estoqueAtual: number;
  estoqueMinimo: number;
  fornecedor: string;
}

interface Movimentacao {
  id: string;
  materialId: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: string;
  motivo: string;
  observacoes?: string;
}

interface EstoqueControlProps {
  materiais: Material[];
  onUpdateEstoque: (materialId: string, novaQuantidade: number) => void;
  onAddMovimentacao: (movimentacao: Omit<Movimentacao, "id" | "data">) => void;
}

export default function EstoqueControl({ materiais, onUpdateEstoque, onAddMovimentacao }: EstoqueControlProps) {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida">("entrada");
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [showMovimentacaoForm, setShowMovimentacaoForm] = useState(false);

  const materiaisComEstoque = materiais.map(material => ({
    ...material,
    estoqueAtual: material.estoqueAtual || 0,
    estoqueMinimo: material.estoqueMinimo || 0
  }));

  const materiaisBaixoEstoque = materiaisComEstoque.filter(m => m.estoqueAtual <= m.estoqueMinimo);
  const materiaisEmEstoque = materiaisComEstoque.filter(m => m.estoqueAtual > m.estoqueMinimo);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getEstoqueStatus = (material: Material) => {
    if (material.estoqueAtual <= 0) {
      return { status: "Sem estoque", color: "bg-red-100 text-red-800" };
    } else if (material.estoqueAtual <= material.estoqueMinimo) {
      return { status: "Estoque baixo", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { status: "Em estoque", color: "bg-green-100 text-green-800" };
    }
  };

  const handleMovimentacao = () => {
    if (selectedMaterial && quantidade && motivo) {
      const quantidadeNum = parseFloat(quantidade);
      const material = materiaisComEstoque.find(m => m.id === selectedMaterial);
      
      if (material) {
        const novaQuantidade = tipoMovimentacao === "entrada" 
          ? material.estoqueAtual + quantidadeNum
          : material.estoqueAtual - quantidadeNum;

        if (novaQuantidade >= 0) {
          onUpdateEstoque(selectedMaterial, novaQuantidade);
          onAddMovimentacao({
            materialId: selectedMaterial,
            tipo: tipoMovimentacao,
            quantidade: quantidadeNum,
            motivo,
            observacoes
          });
          
          // Limpar formulário
          setSelectedMaterial("");
          setQuantidade("");
          setMotivo("");
          setObservacoes("");
          setShowMovimentacaoForm(false);
        } else {
          alert("Quantidade insuficiente em estoque para esta saída!");
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Alertas de Estoque Baixo */}
      {materiaisBaixoEstoque.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            Alertas de Estoque Baixo ({materiaisBaixoEstoque.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materiaisBaixoEstoque.map((material) => {
              const status = getEstoqueStatus(material);
              return (
                <div key={material.id} className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{material.nome}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                      {status.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Estoque atual: {material.estoqueAtual} {material.unidade}</p>
                    <p>Estoque mínimo: {material.estoqueMinimo} {material.unidade}</p>
                    <p>Fornecedor: {material.fornecedor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Controle de Estoque</h3>
          <button
            onClick={() => setShowMovimentacaoForm(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            + Nova Movimentação
          </button>
        </div>

        {/* Formulário de Movimentação */}
        {showMovimentacaoForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Nova Movimentação</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Selecione um material</option>
                  {materiaisComEstoque.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.nome} - Estoque: {material.estoqueAtual} {material.unidade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={tipoMovimentacao}
                  onChange={(e) => setTipoMovimentacao(e.target.value as "entrada" | "saida")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo
                </label>
                <input
                  type="text"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Compra, venda, etc."
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={2}
                placeholder="Observações adicionais..."
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleMovimentacao}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                Confirmar Movimentação
              </button>
              <button
                onClick={() => setShowMovimentacaoForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Materiais */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque Atual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor em Estoque
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materiaisComEstoque.map((material) => {
                const status = getEstoqueStatus(material);
                const valorEmEstoque = material.estoqueAtual * material.precoUnitario;
                
                return (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {material.nome}
                        </div>
                        <div className="text-sm text-gray-500">
                          {material.fornecedor}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {material.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.estoqueAtual} {material.unidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.estoqueMinimo} {material.unidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(valorEmEstoque)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Materiais</p>
              <p className="text-2xl font-bold text-gray-900">{materiaisComEstoque.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
              <p className="text-2xl font-bold text-gray-900">{materiaisBaixoEstoque.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(materiaisComEstoque.reduce((total, m) => total + (m.estoqueAtual * m.precoUnitario), 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
