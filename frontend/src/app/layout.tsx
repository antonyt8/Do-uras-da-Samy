import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delícias da Samy - Sistema de Gestão",
  description: "Sistema de gestão para confeitaria - Controle de materiais, receitas, produtos, clientes e pedidos",
  keywords: "confeitaria, gestão, receitas, pedidos, clientes, estoque",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#FAF9F6]`}>
        {children}
      </body>
    </html>
  );
}
