"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.replace("/");
    } catch {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E2A38] via-[#7A5C3D] to-[#C2A85D] relative overflow-hidden">
      {/* Fundo escuro translúcido */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[#C2A85D]" style={{background: "rgba(255, 248, 240, 0.95)"}}>
        {/* Espaço para futura imagem/ilustração */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full bg-gradient-to-br from-[#F7C5CC] to-[#FFF8F0] p-10">
          <span className="text-7xl mb-4">🧁</span>
          <h2 className={`text-3xl font-bold text-[#7A5C3D] mb-2 ${dancing.className}`}>Delícias da Samy</h2>
          <p className="text-[#BFA181] text-lg text-center">Gestão clássica e aconchegante para sua confeitaria</p>
        </div>
        {/* Card de login */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
          <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6">
            <h1 className={`text-3xl font-bold text-[#7A5C3D] mb-2 text-center ${dancing.className}`}>Login</h1>
            <div>
              <label className="block mb-1 text-sm font-medium text-[#7A5C3D]">Usuário</label>
              <input
                className="w-full border border-[#F6E3B4] px-4 py-2 rounded-lg bg-white text-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-[#C2A85D] transition"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Digite seu usuário"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-[#7A5C3D]">Senha</label>
              <input
                type="password"
                className="w-full border border-[#F6E3B4] px-4 py-2 rounded-lg bg-white text-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-[#C2A85D] transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
            {error && <div className="text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded p-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C2A85D] to-[#F7C5CC] text-[#7A5C3D] font-bold py-2 rounded-lg shadow hover:from-[#F7C5CC] hover:to-[#C2A85D] transition-all text-lg border border-[#C2A85D]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 