"use client";

import { useState, useEffect } from "react";

interface Receita {
  id: string;
  descricao: string;
  custoTotal: number;
}

interface Produto {
  id?: string;
  descricao: string;
  receitaId: string;
  custoUnitario: number;
  margemLucro: number;
  quantidadeProduzida: number;
  precoSugerido: number;
}

interface ProdutoFormProps {
  receitas: Receita[];
  onSave: (produto: Produto) => void;
  onCancel: () => void;
  produto?: Produto;
}

export default function ProdutoForm({ receitas, onSave, onCancel, produto }: ProdutoFormProps) {
  const [formData, setFormData] = useState<Produto>(produto || {
    descricao: "",
    custoUnitario: 0.0,
    receitaId: "",
    margemLucro: 0,
    quantidadeProduzida: 1,
    precoSugerido: 0.0
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const receitaSelecionada = receitas.find(r => String(r.id) === String(formData.receitaId));
  const custoTotal = receitaSelecionada?.custoTotal || 0;
  
  const custoUnitario = formData.quantidadeProduzida > 0 ? custoTotal / formData.quantidadeProduzida : 0;

  const precoSugerido = custoUnitario * (1 + formData.margemLucro / 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.descricao || !formData.receitaId || formData.margemLucro < 0) {
      setError("Preencha todos os campos corretamente.");
      return;
    }
    formData.custoUnitario = custoUnitario;
    formData.precoSugerido = precoSugerido;
    try {
      onSave(formData);
      setSuccess("Produto salvo com sucesso!");
      setTimeout(() => {
        setSuccess("");
        onCancel();
      }, 1200);
    } catch {
      setError("Erro ao salvar produto");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {produto ? "Editar Produto" : "Novo Produto"}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={formData.descricao}
                onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Bolo de Chocolate"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receita Associada *
              </label>
              <select
                value={formData.receitaId}
                onChange={e => setFormData(prev => ({ ...prev, receitaId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecione uma receita</option>
                {receitas.map(receita => (
                  <option key={receita.id} value={receita.id}>{receita.descricao}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Produzida pela Receita *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formData.quantidadeProduzida}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    quantidadeProduzida: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 10 unidades"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Margem de Lucro (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.margemLucro}
                onChange={e => setFormData(prev => ({ ...prev, margemLucro: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>

            {formData.receitaId && (
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Custo da Receita:</span>
                  <span className="text-gray-800">{formatCurrency(custoTotal)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-medium text-gray-700">Preço Sugerido:</span>
                  <span className="font-bold text-pink-600">{formatCurrency(precoSugerido)}</span>
                </div>
              </div>
            )}
          </div>

          {error && <div className="text-red-600 font-semibold bg-red-50 border border-red-200 p-2 rounded text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold bg-green-50 border border-green-200 p-2 rounded text-center">{success}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-60"
              disabled={!formData.descricao || !formData.receitaId}
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
