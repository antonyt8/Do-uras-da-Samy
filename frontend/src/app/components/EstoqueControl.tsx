"use client";

import { useState } from "react";

interface Produto {
  id: string;
  descricao: string;
  precoSugerido: number;
  quantidadeEstoqueAtual: number;
}

interface Movimentacao {
  id?: string;
  produtoId: string;
  tipo: "ENTRADA" | "SAIDA";
  quantidade: number;
  motivo: string;
  observacoes?: string;
}

interface EstoqueControlProps {
  produtos: Produto[];
  onUpdateEstoque: (produtoId: string, novaQuantidade: number) => void;
  onAddMovimentacao: (Movimentacao: Movimentacao) => void;
}

export default function EstoqueControl({
  produtos,
  onUpdateEstoque,
  onAddMovimentacao,
}: EstoqueControlProps) {
  const [selectedProduto, setSelectedProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [showMovimentacaoForm, setShowMovimentacaoForm] = useState(false);

  const produtosComEstoque = produtos.map((produto) => ({
    ...produto,
    estoqueAtual: produto.quantidadeEstoqueAtual || 0,
    estoqueMinimo: 5,
  }));

  const produtosBaixoEstoque = produtosComEstoque.filter(
    (p) => p.estoqueAtual <= p.estoqueMinimo
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getEstoqueStatus = (produto: Produto) => {
    if (produto.quantidadeEstoqueAtual <= 0) {
      return { status: "Sem estoque", color: "bg-red-100 text-red-800" };
    } else if (produto.quantidadeEstoqueAtual <= 5) {
      return { status: "Estoque baixo", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { status: "Em estoque", color: "bg-green-100 text-green-800" };
    }
  };

  const handleMovimentacao = () => {
    console.log("Handling movimentacao")
    if (selectedProduto && quantidade && motivo) {
      const quantidadeNum = parseFloat(quantidade);
      const produto = produtosComEstoque.find((p) => String(p.id) === String(selectedProduto));
      console.log("Produto encontrado:", produto);

      if (produto) {
        const novaQuantidade =
          tipoMovimentacao === "ENTRADA"
            ? produto.estoqueAtual + quantidadeNum
            : produto.estoqueAtual - quantidadeNum;

        if (novaQuantidade >= 0) {
          onUpdateEstoque(selectedProduto, novaQuantidade);
          onAddMovimentacao({
            produtoId: selectedProduto,
            tipo: tipoMovimentacao,
            quantidade: quantidadeNum,
            motivo,
            observacoes,
          });

          // Limpar formulário
          setSelectedProduto("");
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

        {showMovimentacaoForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Nova Movimentação de Produto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                <select
                  value={selectedProduto}
                  onChange={(e) => setSelectedProduto(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Selecione um produto</option>
                  {produtosComEstoque.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao} - Estoque: {produto.estoqueAtual}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={tipoMovimentacao}
                  onChange={(e) =>
                    setTipoMovimentacao(e.target.value as "ENTRADA" | "SAIDA")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
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

        {/* Lista de Produtos */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
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
              {produtosComEstoque.map((produto) => {
                const status = getEstoqueStatus(produto);
                const valorEmEstoque = produto.estoqueAtual * produto.precoSugerido;

                return (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {produto.descricao}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto.estoqueAtual}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto.estoqueMinimo}
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
    </div>
  );
}
