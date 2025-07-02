"use client";
import { useState, useEffect } from "react";
import authFetch from "../utils/authFetch";

interface Produto {
  id: number;
  descricao: string;
  precoSugerido: number;
}

interface PedidoItem {
  produtoId: number;
  quantidade: number;
}

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
  pedido?: any;
}

export default function PedidoForm({ onCancel, onSuccess, pedido }: Props) {
  const [nomeCliente, setNomeCliente] = useState(pedido?.nomeCliente || "");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itens, setItens] = useState<PedidoItem[]>(pedido?.itens ? pedido.itens.map((i: any) => ({ produtoId: i.produtoId, quantidade: i.quantidade })) : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    authFetch("https://sammy-back.onrender.com/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  useEffect(() => {
    if (pedido) {
      setNomeCliente(pedido.nomeCliente || "");
      setItens(pedido.itens ? pedido.itens.map((i: any) => ({ produtoId: i.produtoId, quantidade: i.quantidade })) : []);

    }
  }, [pedido]);

  const addItem = () => {
    setItens([...itens, { produtoId: produtos[0]?.id || 0, quantidade: 1 }]);
  };

  const updateItem = (idx: number, field: string, value: any) => {
    setItens(
      itens.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    );
  };

  const removeItem = (idx: number) => {
    setItens(itens.filter((_, i) => i !== idx));
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produtoId);
      return total + (produto ? produto.precoSugerido * item.quantidade : 0);
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!nomeCliente || itens.length === 0) {
      setError("Preencha o nome do cliente e adicione pelo menos um produto.");
      setLoading(false);
      return;
    }

    const body = {
      nomeCliente,
      itens: itens.map(i => ({ produtoId: i.produtoId, quantidade: Number(i.quantidade) }))

    };

    try {
      let res;
      if (pedido && pedido.id) {
        res = await authFetch(
          `https://sammy-back.onrender.com/api/pedidos/${pedido.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
      } else {
        res = await authFetch("https://sammy-back.onrender.com/api/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) throw new Error("Erro ao salvar pedido");

      setSuccess(pedido ? "Pedido atualizado com sucesso!" : "Pedido criado com sucesso!");

      setNomeCliente("");
      setItens([]);
      setTimeout(() => {
        setSuccess("");
        onSuccess();
      }, 1200);
    } catch {
      setError("Erro ao salvar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">{pedido ? "Editar Pedido" : "Novo Pedido"}</h2>

        <label className="block mb-2 font-medium">Nome do Cliente</label>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Produtos</label>
        {itens.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <select
              className="border px-2 py-1 rounded flex-1"
              value={item.produtoId}
              onChange={e => updateItem(idx, "produtoId", Number(e.target.value))}
            >
              {produtos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.descricao} ({formatCurrency(p.precoSugerido)})
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              className="border px-2 py-1 rounded w-20"
              value={item.quantidade}
              onChange={(e) =>
                updateItem(idx, "quantidade", Number(e.target.value))
              }
              required
            />
            <button type="button" onClick={() => removeItem(idx)} className="text-red-500 text-sm">Remover</button>
          </div>
        ))}

        <button type="button" onClick={addItem} className="bg-pink-500 text-white px-3 py-1 rounded mb-4">
          Adicionar Produto
        </button>

        <div className="text-right mb-4 font-semibold text-lg">
          Total: {formatCurrency(calcularTotal())}
        </div>

        {success && <div className="text-green-600 mb-2 font-semibold bg-green-50 border border-green-200 rounded p-2 text-center">{success}</div>}
        {error && <div className="text-red-500 mb-2 font-semibold bg-red-50 border border-red-200 rounded p-2 text-center">{error}</div>}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-pink-500 text-white disabled:opacity-60" disabled={loading || !nomeCliente || itens.length === 0}>
            {loading ? "Salvando..." : "Finalizar Venda"}
          </button>
        </div>
      </form>
    </div>
  );
}
