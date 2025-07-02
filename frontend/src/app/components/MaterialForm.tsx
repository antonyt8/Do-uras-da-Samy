"use client";

import { useState, useEffect } from "react";

interface Material {
  id?: string;
  descricao: string;
  qtPorcao: string;
  unidadeMedida: string;
}

interface MaterialFormProps {
  onSave: (material: Material) => void;
  onCancel: () => void;
  material?: Material;
}

export default function MaterialForm({ onSave, onCancel, material }: MaterialFormProps) {
  const [formData, setFormData] = useState<Material>({
    descricao: "",
    unidadeMedida: "",
    qtPorcao: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (material) {
      setFormData(material);
    }
  }, [material]);

  const unidades = ["GRAMAS", "LITRO", "UNIDADE", "MILILITRO"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    // Validação simples
    if (!formData.descricao || !formData.unidadeMedida || !formData.qtPorcao) {
      setError("Preencha todos os campos obrigatórios e um preço válido.");
      return;
    }
    try {
      await onSave(formData);
      setSuccess("Material salvo com sucesso!");
      setTimeout(() => {
        setSuccess("");
        onCancel();
      }, 1200);
    } catch {
      setError("Erro ao salvar material");
    }
  };

  const handleChange = (field: keyof Material, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {material ? "Editar Material" : "Novo Material"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Material *
            </label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Ex: Farinha de Trigo"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
              placeholder="Descrição detalhada do material"
            />
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qtd. Porção *
              </label>
              <input
                type="number"
                min={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.qtPorcao}
                onChange={(e) => handleChange("qtPorcao", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidade *
              </label>
              <select
                required
                value={formData.unidadeMedida}
                onChange={(e) => handleChange("unidadeMedida", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Selecione...</option>
                {unidades.map((un) => (
                  <option key={un} value={un}>
                    {un}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {success && <div className="text-green-600 mb-2 font-semibold bg-green-50 border border-green-200 rounded p-2 text-center">{success}</div>}
          {error && <div className="text-red-500 mb-2 font-semibold bg-red-50 border border-red-200 rounded p-2 text-center">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors disabled:opacity-60"
              disabled={!formData.descricao || !formData.unidadeMedida || !formData.qtPorcao}
            >
              {material ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 