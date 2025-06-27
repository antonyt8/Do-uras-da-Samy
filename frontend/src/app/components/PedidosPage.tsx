"use client";
import { useState, useEffect } from "react";
import PedidoForm from "./PedidoForm";
import authFetch from "../utils/authFetch";

interface Pedido {
  id: number;
  nomeCliente: string;
  dataPedido: string;
  status: string;
  total: number;
  itens: { receitaNome: string; quantidade: number }[];
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);
  const [deletingPedido, setDeletingPedido] = useState<Pedido | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const isAuthenticated = typeof window !== "undefined" && !!localStorage.getItem("token");

  const fetchPedidos = () => {
    setLoading(true);
    authFetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (pedido: Pedido) => {
    setDeleteError("");
    try {
      const res = await authFetch(`http://localhost:8080/api/pedidos/${pedido.id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Erro ao excluir pedido");
      setDeleteSuccess("Pedido excluído com sucesso!");
      setDeletingPedido(null);
      fetchPedidos();
      setTimeout(() => setDeleteSuccess(""), 1500);
    } catch {
      setDeleteError("Erro ao excluir pedido");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        fetchPedidos();
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pedidos</h2>
          <p className="text-gray-600">Gerencie os pedidos de clientes e associe receitas</p>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Novo Pedido</span>
          </button>
        )}
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Carregando pedidos...</div>
      ) : pedidos.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <span className="text-6xl mb-4 block">🧾</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido cadastrado</h3>
          <p className="text-gray-600 mb-4">Comece criando seu primeiro pedido para registrar vendas e produção</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors"
          >
            Criar Primeiro Pedido
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#FFF8F0] border border-[#F6E3B4] rounded-2xl shadow-lg">
            <thead>
              <tr className="bg-[#F6E3B4] text-[#7A5C3D]">
                <th className="px-6 py-3 border-b font-semibold text-lg">Cliente</th>
                <th className="px-6 py-3 border-b font-semibold text-lg">Data</th>
                <th className="px-6 py-3 border-b font-semibold text-lg">Status</th>
                <th className="px-6 py-3 border-b font-semibold text-lg">Total</th>
                <th className="px-6 py-3 border-b font-semibold text-lg">Receitas</th>
                <th className="px-6 py-3 border-b font-semibold text-lg">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, idx) => (
                <tr key={pedido.id} className={
                  `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF3E3]'} hover:bg-[#F7C5CC]/40`
                }>
                  <td className="px-6 py-3 border-b text-gray-900">{pedido.nomeCliente}</td>
                  <td className="px-6 py-3 border-b text-gray-700">{new Date(pedido.dataPedido).toLocaleString()}</td>
                  <td className="px-6 py-3 border-b text-gray-700">{pedido.status}</td>
                  <td className="px-6 py-3 border-b text-gray-700">R$ {pedido.total.toFixed(2)}</td>
                  <td className="px-6 py-3 border-b text-gray-700">
                    {pedido.itens.map((item, idx) => (
                      <div key={idx}>
                        {item.receitaNome} <span className="text-gray-500">x{item.quantidade}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-3 border-b flex gap-2">
                    {isAuthenticated && (
                      <>
                        <button onClick={() => setEditingPedido(pedido)} className="text-blue-600 hover:underline">Editar</button>
                        <button onClick={() => setDeletingPedido(pedido)} className="text-red-600 hover:underline">Excluir</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showForm && isAuthenticated && (
        <PedidoForm
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchPedidos();
          }}
        />
      )}
      {editingPedido && isAuthenticated && (
        <PedidoForm
          onCancel={() => setEditingPedido(null)}
          onSuccess={() => {
            setEditingPedido(null);
            fetchPedidos();
          }}
          pedido={editingPedido}
        />
      )}
      {deletingPedido && isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">Tem certeza que deseja excluir o pedido de <b>{deletingPedido.nomeCliente}</b>?</p>
            {deleteError && <div className="text-red-500 mb-2">{deleteError}</div>}
            <div className="flex gap-4 justify-center">
              <button onClick={() => setDeletingPedido(null)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
              <button onClick={() => handleDelete(deletingPedido)} className="px-4 py-2 bg-red-500 text-white rounded">Excluir</button>
            </div>
          </div>
        </div>
      )}
      {deleteSuccess && <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">{deleteSuccess}</div>}
    </div>
  );
} 