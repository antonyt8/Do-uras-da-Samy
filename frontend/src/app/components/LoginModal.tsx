import { useState } from "react";

interface LoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function LoginModal({ onSuccess, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error("Usuário ou senha inválidos");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(30, 42, 56, 0.10)" }}>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#FAF9F6] rounded-2xl shadow-xl border border-[#DDDDDD] p-8 relative animate-fadeIn"
        style={{ boxShadow: "0 8px 32px rgba(30,42,56,0.10)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A7A7A] hover:text-[#1E2A38] text-2xl font-bold focus:outline-none"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-[#1E2A38] text-center">Acesso do Gestor</h2>
        <p className="text-[#7A7A7A] text-center mb-6">Entre para gerenciar o sistema</p>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[#3E3E3E]">Usuário</label>
          <input
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded-lg bg-white text-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-[#C2A85D] transition"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
            placeholder="Digite seu usuário"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[#3E3E3E]">Senha</label>
          <input
            type="password"
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded-lg bg-white text-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-[#C2A85D] transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>
        {error && <div className="text-red-600 mb-4 text-center font-semibold bg-red-50 border border-red-200 rounded p-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#DDDDDD] bg-white text-[#3E3E3E] hover:bg-[#EFE8DC] transition font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#C2A85D] text-white font-semibold hover:bg-[#EFE8DC] hover:text-[#1E2A38] transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
      <style jsx global>{`
        body { background: #FAF9F6; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s; }
      `}</style>
    </div>
  );
} 