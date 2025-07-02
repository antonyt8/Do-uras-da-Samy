"use client";

import { useState, useEffect } from "react";
import MaterialForm from "./components/MaterialForm";
import MaterialTable from "./components/MaterialTable";
import ProdutoTable from "./components/ProdutoTable";
import ReceitaForm from "./components/ReceitaForm";
import ReceitaTable from "./components/ReceitaTable";
import ReceitaDetail from "./components/ReceitaDetail";
import Dashboard from "./components/Dashboard";
import EstoqueControl from "./components/EstoqueControl";
import PedidosPage from "./components/PedidosPage";
import MaterialDetail from "./components/MaterialDetail";
import AuthGuard from "./components/AuthGuard";
import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";
import ProdutoForm from "./components/ProdutoForm";

// Dados mockados para demonstração
const mockMateriais = [
  {
    id: "1",
    nome: "Farinha de Trigo",
    descricao: "Farinha de trigo tipo 1",
    categoria: "Farinhas",
    unidade: "kg",
    precoUnitario: 4.5,
    fornecedor: "Distribuidora Central",
    estoqueAtual: 25.5,
    estoqueMinimo: 10.0,
  },
  {
    id: "2",
    nome: "Açúcar Refinado",
    descricao: "Açúcar branco refinado",
    categoria: "Açúcares",
    unidade: "kg",
    precoUnitario: 3.8,
    fornecedor: "Distribuidora Central",
    estoqueAtual: 15.0,
    estoqueMinimo: 8.0,
  },
  {
    id: "3",
    nome: "Chocolate em Pó",
    descricao: "Chocolate em pó 50% cacau",
    categoria: "Chocolates",
    unidade: "kg",
    precoUnitario: 25.0,
    fornecedor: "Cacau Brasil",
    estoqueAtual: 2.5,
    estoqueMinimo: 5.0,
  },
  {
    id: "4",
    nome: "Ovos",
    descricao: "Ovos de galinha caipira",
    categoria: "Ovos",
    unidade: "dúzia",
    precoUnitario: 8.5,
    fornecedor: "Granja São João",
    estoqueAtual: 0,
    estoqueMinimo: 5,
  },
];

const mockReceitas = [
  {
    id: "1",
    nome: "Bolo de Chocolate",
    descricao: "Delicioso bolo de chocolate com cobertura cremosa",
    instrucoes:
      "1. Pré-aqueça o forno a 180°C\n2. Misture os ingredientes secos\n3. Adicione os ingredientes líquidos\n4. Asse por 40 minutos\n5. Deixe esfriar antes de desenformar",
    tempoPreparo: 60,
    rendimento: "12 fatias",
    materiais: [
      { materialId: "1", quantidade: 2, unidade: "kg" },
      { materialId: "2", quantidade: 1.5, unidade: "kg" },
      { materialId: "3", quantidade: 0.5, unidade: "kg" },
      { materialId: "4", quantidade: 3, unidade: "dúzia" },
    ],
    dataCriacao: "2024-01-15",
    visualizacoes: 15,
  },
  {
    id: "2",
    nome: "Torta de Maçã",
    descricao: "Torta tradicional de maçã com massa crocante",
    instrucoes:
      "1. Prepare a massa\n2. Corte as maçãs\n3. Monte a torta\n4. Asse por 45 minutos",
    tempoPreparo: 90,
    rendimento: "8 porções",
    materiais: [
      { materialId: "1", quantidade: 1, unidade: "kg" },
      { materialId: "2", quantidade: 0.5, unidade: "kg" },
      { materialId: "4", quantidade: 2, unidade: "dúzia" },
    ],
    dataCriacao: "2024-01-20",
    visualizacoes: 8,
  },
];

const mockStats = {
  totalMateriais: 4,
  totalReceitas: 2,
  custoMedioReceita: 45.75,
  receitasRecentes: 1,
  materiaisBaixoEstoque: 2,
  receitasPopulares: [
    { nome: "Bolo de Chocolate", visualizacoes: 15 },
    { nome: "Torta de Maçã", visualizacoes: 8 },
  ],
  custosPorCategoria: [
    { categoria: "Chocolates", valor: 125.0 },
    { categoria: "Farinhas", valor: 45.0 },
    { categoria: "Açúcares", valor: 38.0 },
    { categoria: "Ovos", valor: 85.0 },
  ],
};

const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [materiais, setMateriais] = useState<any[]>([]);
  const [receitas, setReceitas] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showReceitaForm, setShowReceitaForm] = useState(false);
  const [showReceitaDetail, setShowReceitaDetail] = useState(false);
  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [editingReceita, setEditingReceita] = useState<any>(null);
  const [editingProduto, setEditingProduto] = useState<any>(null);
  const [viewingReceita, setViewingReceita] = useState<any>(null);
  const [viewingMaterial, setViewingMaterial] = useState<any>(null);
  const [materialMsg, setMaterialMsg] = useState("");
  const [receitaMsg, setReceitaMsg] = useState("");
  const [produtoMsg, setProdutoMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Buscar dados reais ao carregar
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!token) {
      router.replace("/login");
      return;
    }
    authFetch("https://sammy-back.onrender.com/api/materiais")
      .then((res) => res.json())
      .then(setMateriais);
    authFetch("https://sammy-back.onrender.com/api/receitas")
      .then((res) => res.json())
      .then(setReceitas);
    authFetch("http://localhost:8080/api/produtos")
      .then(res => res.json())
      .then(setProdutos);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.replace("/login");
  };

  // Função utilitária para fetch autenticado
  const authFetch = (url: string, options: any = {}) => {
    const token = localStorage.getItem("token");
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  const handleSaveMaterial = async (material: any) => {
    try {
      let res;
      if (editingMaterial && editingMaterial.id) {
        res = await authFetch(
          `https://sammy-back.onrender.com/api/materiais/${editingMaterial.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(material),
          },
        );
      } else {
        res = await authFetch("https://sammy-back.onrender.com/api/materiais", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(material),
        });
      }
      if (!res.ok) throw new Error();
      setMaterialMsg("Material salvo com sucesso!");
      authFetch("https://sammy-back.onrender.com/api/materiais").then(res => res.json()).then(setMateriais);

    } catch {
      setMaterialMsg("Erro ao salvar material");
    }
    setShowMaterialForm(false);
    setEditingMaterial(null);
    setTimeout(() => setMaterialMsg(""), 1500);
  };

  const handleEditMaterial = (material: any) => {
    setEditingMaterial(material);
    setShowMaterialForm(true);
  };

  const handleDeleteMaterial = async (id: string | number) => {
    if (!confirm("Tem certeza que deseja excluir este material?")) return;
    try {
      const res = await authFetch(
        `https://sammy-back.onrender.com/api/materiais/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error();
      setMaterialMsg("Material excluído com sucesso!");
      setMateriais((materiais) => materiais.filter((m) => m.id !== id));
    } catch {
      setMaterialMsg("Erro ao excluir material");
    }
    setTimeout(() => setMaterialMsg(""), 1500);
  };

  const handleSaveReceita = async (receita: any) => {
    try {
      let res;
      if (editingReceita && editingReceita.id) {
        res = await authFetch(
          `https://sammy-back.onrender.com/api/receitas/${editingReceita.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(receita),
          },
        );
      } else {
        res = await authFetch("https://sammy-back.onrender.com/api/receitas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receita),
        });
      }
      if (!res.ok) throw new Error();
      setReceitaMsg("Receita salva com sucesso!");
      authFetch("https://sammy-back.onrender.com/api/receitas").then(res => res.json()).then(setReceitas);
    } catch {
      setReceitaMsg("Erro ao salvar receita");
    }
    setShowReceitaForm(false);
    setEditingReceita(null);
    setTimeout(() => setReceitaMsg(""), 1500);
  };

  const handleEditReceita = (receita: any) => {
    setEditingReceita(receita);
    setShowReceitaForm(true);
  };

  const handleDeleteReceita = async (id: string | number) => {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;
    try {
      const res = await authFetch(
        `https://sammy-back.onrender.com/api/receitas/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error();
      setReceitaMsg("Receita excluída com sucesso!");
      setReceitas((receitas) => receitas.filter((r) => r.id !== id));
    } catch {
      setReceitaMsg("Erro ao excluir receita");
    }
    setTimeout(() => setReceitaMsg(""), 1500);
  };

  const handleSaveProduto = async (receita: any) => {
    try {
      let res;
      if (editingReceita && editingReceita.id) {
        res = await authFetch(`https://sammy-back.onrender.com/api/produtos/${editingProduto.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receita)
        });
      } else {
        res = await authFetch("https://sammy-back.onrender.com/api/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receita)
        });
      }
      if (!res.ok) throw new Error();
      setProdutoMsg("Produto salvo com sucesso!");
      authFetch("https://sammy-back.onrender.com/api/produtos").then(res => res.json()).then(setProdutos);
    } catch {
      setProdutoMsg("Erro ao salvar receita");
    }
    setShowReceitaForm(false);
    setEditingReceita(null);
    setTimeout(() => setReceitaMsg(""), 1500);
  };

  const handleEditProduto = (produto: any) => {
    setEditingProduto(produto);
    setShowProdutoForm(true);
  };

  const handleDeleteProduto = async (id: string | number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      const res = await authFetch(`https://sammy-back.onrender.com/api/produtos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProdutoMsg("Produto excluído com sucesso!");
      setProdutos(produtos => produtos.filter(r => r.id !== id));
    } catch {
      setReceitaMsg("Erro ao excluir produto");
    }
    setTimeout(() => setReceitaMsg(""), 1500);
  };

  const handleViewReceita = (receita: any) => {
    setViewingReceita(receita);
    setShowReceitaDetail(true);
  };

  const handleUpdateEstoque = (materialId: string, novaQuantidade: number) => {
    // setMateriais(prev => prev.map(m => 
    //   m.id === materialId ? { ...m, estoqueAtual: novaQuantidade } : m
    // ));
    console.log(`Atualizando estoque do material ${materialId} para ${novaQuantidade}`);
  };

  const handleAddMovimentacao = async (movimentacao: any) => {
    try {
      const response = await authFetch("https://sammy-back.onrender.com/api/movimentacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movimentacao)
        });

      if (!response.ok) {
        const error = await response.text();
        console.error("Erro ao registrar movimentação:", error);
        alert("Erro ao registrar movimentação");
        return;
      }

      const data = await response.json();
      console.log("Movimentação registrada com sucesso:", data);
      authFetch("http://localhost:8080/api/produtos").then(res => res.json()).then(setProdutos);
      alert("Movimentação registrada com sucesso!");      
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "materiais", label: "Materiais", icon: "📦" },
    { id: "receitas", label: "Receitas", icon: "🍰" },
    { id: "produtos", label: "Produtos", icon: "🧁" },
    { id: "estoque", label: "Estoque", icon: "📋" },
    { id: "pedidos", label: "Pedidos", icon: "🧾" },
    { id: "relatorios", label: "Relatórios", icon: "📈" },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-[#FFF8F0] shadow-md border-b border-[#F6E3B4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🍰</span>
                <h1
                  className={`text-2xl font-bold text-[#7A5C3D] ${dancing.className}`}
                >
                  Delícias da Samy
                </h1>
                <span className="ml-2 text-sm text-[#BFA181] font-medium">
                  Sistema de Gestão
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="text-[#7A5C3D] hover:text-[#C2A85D] font-semibold transition-colors px-3 py-1 rounded-md border border-transparent hover:border-[#C2A85D]"
                  >
                    Sair
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-[#C2A85D] shadow-md">
                    S
                  </div>
                  <span className="text-base font-medium text-[#7A5C3D]">
                    Samy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-4 bg-white rounded-xl shadow p-2 mb-8 border border-[#F6E3B4]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-[#F7C5CC] text-[#7A5C3D] shadow-md border border-[#C2A85D]"
                        : "text-[#BFA181] hover:text-[#7A5C3D] hover:bg-[#FFF8F0]"
                    }
                  `}
                  style={{
                    boxShadow:
                      activeTab === tab.id
                        ? "0 2px 8px rgba(194,168,93,0.10)"
                        : undefined,
                  }}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === "dashboard" && <Dashboard />}

            {activeTab === "materiais" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Materiais
                    </h2>
                    <p className="text-gray-600">
                      Gerencie os materiais e ingredientes
                    </p>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => setShowMaterialForm(true)}
                      className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
                    >
                      <span>+</span>
                      <span>Novo Material</span>
                    </button>
                  )}
                </div>

                <MaterialTable
                  materiais={materiais}
                  onEdit={handleEditMaterial}
                  onDelete={handleDeleteMaterial}
                  onView={setViewingMaterial}
                />
              </div>
            )}

            {activeTab === "receitas" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Receitas
                    </h2>
                    <p className="text-gray-600">
                      Gerencie as receitas e seus custos
                    </p>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => setShowReceitaForm(true)}
                      className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
                    >
                      <span>+</span>
                      <span>Nova Receita</span>
                    </button>
                  )}
                </div>

                {receitas.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <span className="text-6xl mb-4 block">🍰</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Nenhuma receita cadastrada
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Comece criando sua primeira receita para calcular custos e
                      gerenciar ingredientes
                    </p>
                    {isAuthenticated && (
                      <button
                        onClick={() => setShowReceitaForm(true)}
                        className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors"
                      >
                        Criar Primeira Receita
                      </button>
                    )}
                  </div>
                ) : (
                  <ReceitaTable
                    receitas={receitas}
                    materiais={materiais}
                    onEdit={handleEditReceita}
                    onDelete={handleDeleteReceita}
                    onView={handleViewReceita}
                  />
                )}
              </div>
            )}

            {activeTab === "produtos" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
                    <p className="text-gray-600">Produtos derivados das receitas</p>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => setShowProdutoForm(true)}
                      className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
                    >
                      <span>+</span>
                      <span>Novo Produto</span>
                    </button>
                  )}
                </div>

                <ProdutoTable
                  produtos={produtos}
                  onEdit={(produto) => console.log("Editar produto", produto)}
                  onDelete={(id) => console.log("Excluir produto", id)}
                  onView={(produto) => console.log("Visualizar produto", produto)}
                />
              </div>
            )}

            {activeTab === "estoque" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Controle de Estoque
                  </h2>
                  <p className="text-gray-600">
                    Monitore o estoque e configure alertas
                  </p>
                </div>

                <EstoqueControl
                  produtos={produtos}
                  onUpdateEstoque={handleUpdateEstoque}
                  onAddMovimentacao={handleAddMovimentacao}
                />
              </div>
            )}

            {activeTab === "pedidos" && <PedidosPage />}

            {activeTab === "relatorios" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Relatórios
                  </h2>
                  <p className="text-gray-600">
                    Visualize relatórios e análises
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                  <span className="text-6xl mb-4 block">📈</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Funcionalidade em Desenvolvimento
                  </h3>
                  <p className="text-gray-600">
                    Os relatórios serão implementados em breve
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {showMaterialForm && (
          <MaterialForm
            onSave={handleSaveMaterial}
            onCancel={() => {
              setShowMaterialForm(false);
              setEditingMaterial(null);
            }}
            material={editingMaterial}
          />
        )}

        {showReceitaForm && (
          <ReceitaForm
            materiais={materiais}
            onSave={handleSaveReceita}
            onCancel={() => {
              setShowReceitaForm(false);
              setEditingReceita(null);
            }}
            receita={editingReceita}
          />
        )}

        {showReceitaDetail && viewingReceita && (
          <ReceitaDetail
            receita={viewingReceita}
            materiais={materiais}
            onClose={() => {
              setShowReceitaDetail(false);
              setViewingReceita(null);
            }}
            onEdit={() => {
              setShowReceitaDetail(false);
              setViewingReceita(null);
              setEditingReceita(viewingReceita);
              setShowReceitaForm(true);
            }}
          />
        )}

        {showProdutoForm && (
          <ProdutoForm
            receitas={receitas}
            onSave={handleSaveProduto}
            onCancel={() => {
              setShowProdutoForm(false);
              setEditingProduto(null);
            }}
            produto={editingProduto}
          />
        )}

        {viewingMaterial && (
          <MaterialDetail
            material={viewingMaterial}
            onClose={() => setViewingMaterial(null)}
          />
        )}

        {materialMsg && <div className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded shadow z-50">{materialMsg}</div>}
        {receitaMsg && <div className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded shadow z-50">{receitaMsg}</div>}
        {produtoMsg && <div className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded shadow z-50">{produtoMsg}</div>}
      </div>
    </AuthGuard>
  );
}
