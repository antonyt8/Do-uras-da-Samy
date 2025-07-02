"use client";

import { useState, useEffect } from "react";

interface Material {
  id: string;
  descricao: string;
  qtPorcao: number;
  unidade: string;
  vlPorcao: number
}

interface ReceitaMaterial {
  materialId: string;
  quantidade: number;
  unidade: string;
}

interface Receita {
  id?: string;
  descricao: string;
  materiais: ReceitaMaterial[];
}

interface ReceitaFormProps {
  materiais: Material[];
  onSave: (receita: Receita) => void;
  onCancel: () => void;
  receita?: Receita;
}

export default function ReceitaForm({ materiais, onSave, onCancel, receita }: ReceitaFormProps) {
  const [formData, setFormData] = useState<Receita>(receita || {
    descricao: "",
    materiais: []
  });

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const material = materiais.find((m) => String(m.id) === String(selectedMaterial));
    if (material) {
      setUnidade(material.unidade);
    } else {
      setUnidade("");
    }
  }, [selectedMaterial, materiais]);


  const handleAddMaterial = () => {
    console.log("Adding material:", selectedMaterial, quantidade, unidade);
    if (selectedMaterial && quantidade && unidade) {
      console.log(materiais)
      console.log(selectedMaterial)
      console.log(materiais.find(m => String(m.id) === String(selectedMaterial)));
      const material = materiais.find(m => String(m.id) === String(selectedMaterial));
      console.log("Found material:", material);
      if (material) {
        setFormData(prev => ({
          ...prev,
          materiais: [...prev.materiais, {
            materialId: selectedMaterial,
            quantidade: parseFloat(quantidade),
            unidade
          }]
        }));
        setSelectedMaterial("");
        setQuantidade("");
        setUnidade("");
      }
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materiais: prev.materiais.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!formData.descricao || formData.materiais.length === 0) {
      setError("Preencha o nome da receita e adicione pelo menos um material.");
      return;
    }
    try {
      console.log("Saving receita:", formData);
      onSave(formData);
      setSuccess("Receita salva com sucesso!");
      setTimeout(() => {
        setSuccess("");
        onCancel();
      }, 1200);
    } catch {
      setError("Erro ao salvar receita");
    }
  };

  const calculateTotalCost = () => {
    return formData.materiais.reduce((total, item) => {
      const material = materiais.find(m => String(m.id) === String(item.materialId));
      if (material) {
        return total + (material.vlPorcao/material.qtPorcao * item.quantidade);
      }
      return total;
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {receita ? "Editar Receita" : "Nova Receita"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Receita *
              </label>
              <input
                type="text"
                required
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Ex: Bolo de Chocolate"
              />
            </div>
          </div>

          {/* Materiais */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Materiais da Receita</h4>
            
            {/* Adicionar Material */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    {materiais.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.descricao}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade Utilizada
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
                    Unidade
                  </label>
                  <input
                    type="text"
                    value={unidade}
                    readOnly
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-700 rounded-md cursor-not-allowed"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Materiais */}
            {formData.materiais.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Preço Unit.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Subtotal
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {formData.materiais.map((item, index) => {
                      const material = materiais.find(m => String(m.id) === String(item.materialId));
                      const subtotal = material ? material.vlPorcao/material.qtPorcao * item.quantidade : 0;
                      
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {material?.descricao}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.quantidade} {item.unidade}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {material ? formatCurrency(material.vlPorcao/material.qtPorcao) : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {formatCurrency(subtotal)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveMaterial(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Custo Total */}
            {formData.materiais.length > 0 && (
              <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Custo Total da Receita:</span>
                  <span className="text-2xl font-bold text-pink-600">
                    {formatCurrency(calculateTotalCost())}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            {success && <div className="text-green-600 mb-2 font-semibold bg-green-50 border border-green-200 rounded p-2 text-center">{success}</div>}
            {error && <div className="text-red-500 mb-2 font-semibold bg-red-50 border border-red-200 rounded p-2 text-center">{error}</div>}
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors disabled:opacity-60"
              disabled={!formData.descricao || formData.materiais.length === 0}
            >
              Salvar Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
