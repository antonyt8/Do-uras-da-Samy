"use client";
import { useState, useEffect } from "react";
import authFetch from "../utils/authFetch";

interface Receita {
  id: number;
  nome: string;
}

interface PedidoItem {
  receitaId: number;
  quantidade: number;
}

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
  pedido?: any;
}

export default function PedidoForm({ onCancel, onSuccess, pedido }: Props) {
  const [nomeCliente, setNomeCliente] = useState(pedido?.nomeCliente || "");
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [itens, setItens] = useState<PedidoItem[]>(
    pedido?.itens
      ? pedido.itens.map((i: any) => ({
          receitaId: i.receitaId,
          quantidade: i.quantidade,
        }))
      : [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    authFetch("https://sammy-back.onrender.com/api/receitas")
      .then((res) => res.json())
      .then((data) => setReceitas(data));
  }, []);

  useEffect(() => {
    if (pedido) {
      setNomeCliente(pedido.nomeCliente || "");
      setItens(
        pedido.itens
          ? pedido.itens.map((i: any) => ({
              receitaId: i.receitaId,
              quantidade: i.quantidade,
            }))
          : [],
      );
    }
  }, [pedido]);

  const addItem = () => {
    setItens([...itens, { receitaId: receitas[0]?.id || 0, quantidade: 1 }]);
  };

  const updateItem = (idx: number, field: string, value: any) => {
    setItens(
      itens.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    );
  };

  const removeItem = (idx: number) => {
    setItens(itens.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!nomeCliente || itens.length === 0) {
      setError("Preencha o nome do cliente e adicione pelo menos uma receita.");
      setLoading(false);
      return;
    }
    const body = {
      nomeCliente,
      itens: itens.map((i) => ({
        receitaId: i.receitaId,
        quantidade: Number(i.quantidade),
      })),
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
      if (!res.ok)
        throw new Error(
          pedido ? "Erro ao atualizar pedido" : "Erro ao criar pedido",
        );
      setSuccess(
        pedido
          ? "Pedido atualizado com sucesso!"
          : "Pedido criado com sucesso!",
      );
      setNomeCliente("");
      setItens([]);
      setTimeout(() => {
        setSuccess("");
        onSuccess();
      }, 1200);
    } catch {
      setError(pedido ? "Erro ao atualizar pedido" : "Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative"
      >
        <h2 className="text-xl font-bold mb-4">
          {pedido ? "Editar Pedido" : "Novo Pedido"}
        </h2>
        <label className="block mb-2 font-medium">Nome do Cliente</label>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />
        <label className="block mb-2 font-medium">Receitas</label>
        {itens.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <select
              className="border px-2 py-1 rounded"
              value={item.receitaId}
              onChange={(e) =>
                updateItem(idx, "receitaId", Number(e.target.value))
              }
            >
              {receitas.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nome}
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
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-red-500"
            >
              Remover
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="bg-pink-500 text-white px-3 py-1 rounded mb-4"
        >
          Adicionar Receita
        </button>
        {success && (
          <div className="text-green-600 mb-2 font-semibold bg-green-50 border border-green-200 rounded p-2 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="text-red-500 mb-2 font-semibold bg-red-50 border border-red-200 rounded p-2 text-center">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-pink-500 text-white disabled:opacity-60"
            disabled={loading || !nomeCliente || itens.length === 0}
          >
            {loading
              ? pedido
                ? "Salvando..."
                : "Salvando..."
              : pedido
                ? "Salvar Alterações"
                : "Salvar Pedido"}
          </button>
        </div>
      </form>
    </div>
  );
}
