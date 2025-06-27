"use client";

import { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Dancing_Script } from "next/font/google";
import authFetch from "../utils/authFetch";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardStats {
  totalMateriais: number;
  totalReceitas: number;
  custoMedioReceita: number;
  receitasRecentes: number;
  materiaisBaixoEstoque: number;
  receitasPopulares: Array<{ nome: string; visualizacoes: number }>;
  custosPorCategoria: Array<{ categoria: string; valor: number }>;
}

const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("http://localhost:8080/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center text-[#7A7A7A]">Carregando estatísticas...</div>;
  }

  if (!stats) {
    return <div className="text-center text-[#7A7A7A]">Não foi possível carregar as estatísticas.</div>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "7d": return "Últimos 7 dias";
      case "30d": return "Últimos 30 dias";
      case "90d": return "Últimos 90 dias";
      default: return "Últimos 7 dias";
    }
  };

  return (
    <div className="space-y-10 bg-[#FAF3E3] min-h-screen py-8 px-2 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-4xl font-bold text-[#7A5C3D] mb-1 ${dancing.className}`}>Dashboard</h1>
          <p className="text-[#BFA181] text-lg">Visão geral da confeitaria</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] flex flex-col items-center">
          <span className="text-5xl mb-3">��</span>
          <div className="text-3xl font-bold text-[#7A5C3D]">{stats.totalMateriais}</div>
          <div className="text-[#BFA181] text-lg">Materiais cadastrados</div>
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] flex flex-col items-center">
          <span className="text-5xl mb-3">🍰</span>
          <div className="text-3xl font-bold text-[#7A5C3D]">{stats.totalReceitas}</div>
          <div className="text-[#BFA181] text-lg">Receitas cadastradas</div>
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] flex flex-col items-center">
          <span className="text-5xl mb-3">🧾</span>
          <div className="text-3xl font-bold text-[#7A5C3D]">{stats.totalPedidos}</div>
          <div className="text-[#BFA181] text-lg">Pedidos registrados</div>
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] flex flex-col items-center">
          <span className="text-5xl mb-3">��</span>
          <div className="text-3xl font-bold text-[#7A5C3D]">{formatCurrency(Number(stats.valorTotalEstoque || 0))}</div>
          <div className="text-[#BFA181] text-lg">Valor total em estoque</div>
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] flex flex-col items-center">
          <span className="text-5xl mb-3">⚠️</span>
          <div className="text-3xl font-bold text-[#C2A85D]">{stats.materiaisBaixoEstoque}</div>
          <div className="text-[#BFA181] text-lg">Materiais com estoque baixo</div>
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4]">
          <div className="font-bold text-[#7A5C3D] mb-2 text-lg">Receitas Populares</div>
          {Array.isArray(stats.receitasPopulares) && stats.receitasPopulares.length > 0 ? (
            <ul className="text-[#7A5C3D] text-base space-y-1">
              {stats.receitasPopulares.map((r: any) => (
                <li key={r.id}>
                  <span className="font-semibold">{r.nome}</span> — {r.visualizacoes} visualizações
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-[#BFA181]">Nenhuma receita popular</div>
          )}
        </div>
        <div className="bg-[#FFF8F0] rounded-2xl shadow-lg p-8 border-2 border-[#F6E3B4] col-span-1 md:col-span-2 lg:col-span-3">
          <div className="font-bold text-[#7A5C3D] mb-2 text-lg">Pedidos Recentes</div>
          {Array.isArray(stats.pedidosRecentes) && stats.pedidosRecentes.length > 0 ? (
            <ul className="text-[#7A5C3D] text-base space-y-1">
              {stats.pedidosRecentes.map((p: any) => (
                <li key={p.id}>
                  <span className="font-semibold">{p.nomeCliente}</span> — {new Date(p.dataPedido).toLocaleString()} — {p.status}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-[#BFA181]">Nenhum pedido recente</div>
          )}
        </div>
      </div>

      {/* Gráfico de Pizza: Valor de Estoque por Categoria */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#F6E3B4]">
        <h3 className={`text-2xl font-semibold text-[#7A5C3D] mb-4 ${dancing.className}`}>Distribuição do Valor de Estoque por Categoria</h3>
        {Array.isArray(stats.custosPorCategoria) && stats.custosPorCategoria.length > 0 ? (
          <Pie
            data={{
              labels: stats.custosPorCategoria.map((c: any) => c.categoria),
              datasets: [
                {
                  data: stats.custosPorCategoria.map((c: any) => c.valor),
                  backgroundColor: [
                    '#F7C5CC', '#F6E3B4', '#C2A85D', '#BFA181',
                    '#F59E0B', '#F472B6', '#A78BFA', '#34D399'
                  ],
                  borderWidth: 2,
                  borderColor: '#FFF8F0',
                },
              ],
            }}
            options={{
              plugins: {
                legend: { position: 'bottom' as const, labels: { color: '#7A5C3D', font: { family: 'Dancing Script, cursive', size: 16 } } },
                tooltip: { enabled: true },
              },
            }}
            height={220}
          />
        ) : (
          <div className="text-center py-8 text-[#BFA181]">
            <span className="text-4xl mb-2 block">��</span>
            <p>Nenhum dado de custo disponível</p>
          </div>
        )}
      </div>

      {/* Custos por Categoria */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#F6E3B4]">
        <h3 className={`text-2xl font-semibold text-[#7A5C3D] mb-4 ${dancing.className}`}>Custos por Categoria</h3>
        <div className="space-y-3">
          {Array.isArray(stats.custosPorCategoria) && stats.custosPorCategoria.length === 0 ? (
            <div className="text-center py-8 text-[#BFA181]">
              <span className="text-4xl mb-2 block">📊</span>
              <p>Nenhum dado de custo disponível</p>
            </div>
          ) : (
            (stats.custosPorCategoria || []).map((categoria: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3 border-2 border-[#C2A85D]"
                    style={{
                      backgroundColor: [
                        '#F7C5CC', '#F6E3B4', '#C2A85D', '#BFA181', 
                        '#F59E0B', '#F472B6', '#A78BFA', '#34D399'
                      ][index % 8]
                    }}
                  ></div>
                  <span className="text-base font-medium text-[#7A5C3D]">{categoria.categoria}</span>
                </div>
                <span className="text-base font-semibold text-[#7A5C3D]">
                  {formatCurrency(categoria.valor)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#F6E3B4]">
        <h3 className={`text-2xl font-semibold text-[#7A5C3D] mb-4 ${dancing.className}`}>Atividades Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-[#F7C5CC]/40 rounded-lg">
            <div className="p-2 bg-[#F7C5CC] rounded-full mr-3">
              <span className="text-pink-700 text-xl">✓</span>
            </div>
            <div>
              <p className="text-base font-medium text-[#7A5C3D]">Receita "Bolo de Chocolate" criada</p>
              <p className="text-xs text-[#BFA181]">Há 2 horas</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-[#F6E3B4]/40 rounded-lg">
            <div className="p-2 bg-[#F6E3B4] rounded-full mr-3">
              <span className="text-yellow-700 text-xl">📦</span>
            </div>
            <div>
              <p className="text-base font-medium text-[#7A5C3D]">Material "Farinha de Trigo" atualizado</p>
              <p className="text-xs text-[#BFA181]">Há 4 horas</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-[#C2A85D]/20 rounded-lg">
            <div className="p-2 bg-[#C2A85D] rounded-full mr-3">
              <span className="text-white text-xl">⚠️</span>
            </div>
            <div>
              <p className="text-base font-medium text-[#7A5C3D]">Estoque baixo: "Chocolate em Pó"</p>
              <p className="text-xs text-[#BFA181]">Há 6 horas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dicas Rápidas */}
      <div className="bg-gradient-to-r from-[#F7C5CC] to-[#F6E3B4] p-8 rounded-2xl text-[#7A5C3D] shadow-lg border-2 border-[#F6E3B4]">
        <h3 className={`text-2xl font-semibold mb-3 ${dancing.className}`}>💡 Dicas para Otimizar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
          <div className="flex items-start">
            <span className="mr-2 text-xl">📊</span>
            <p>Monitore regularmente os custos dos materiais para manter a lucratividade</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 text-xl">📝</span>
            <p>Mantenha as receitas atualizadas com as quantidades corretas</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 text-xl">⚠️</span>
            <p>Configure alertas para materiais com estoque baixo</p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body { background: #FAF3E3; }
      `}</style>
    </div>
  );
}
