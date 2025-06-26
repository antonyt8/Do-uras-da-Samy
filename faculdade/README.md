# Sistema de Gestão para Confeiteira - MVP

Este projeto visa automatizar e padronizar os processos da confeitaria "Delícias da Samy", substituindo controles manuais por uma solução digital simples e eficiente.

## 🚀 Status do Projeto

### ✅ Implementado
- **Frontend**: Interface moderna com Next.js 15, TypeScript e Tailwind CSS
- **Backend**: API REST com Spring Boot 3.5.2 e Java 17
- **Banco de Dados**: Configuração PostgreSQL
- **Interface**: Dashboard responsivo com navegação entre módulos
- **Componentes**: Formulário de materiais funcional

### 🔄 Em Desenvolvimento
- Integração frontend-backend
- CRUD completo para todos os módulos
- Autenticação e autorização

## 🛠️ Tecnologias
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend:** Java 17 + Spring Boot 3.5.2
- **Banco de dados:** PostgreSQL 14
- **Prototipagem:** Figma
- **Versionamento:** Git + GitHub

## 📁 Estrutura de Pastas
```
backend/         # Java (Spring Boot) - API REST
frontend/        # Next.js - Interface Web
database/        # Scripts SQL para PostgreSQL
docs/            # Documentação, termo de abertura, escopo, backlog
prototyping/     # Arquivos do Figma ou links para protótipos
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- Java 17+
- PostgreSQL 14+

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:3000

### Backend
```bash
cd backend
./gradlew bootRun
```
API disponível em: http://localhost:8080

### Banco de Dados
Certifique-se de que o PostgreSQL está rodando e configure as credenciais em:
```
backend/src/main/resources/application.properties
```

## 📋 Sprints
- ✅ Sprint 1: Termo de abertura, definição de escopo e backlog
- ✅ Sprint 2: Protótipos + cadastro de materiais, receitas e precificação
- 🔄 Sprint 3: Cadastro de produtos, clientes, estoque e pedidos
- ⏳ Sprint 4: Testes, implantação e validação final

## 🎯 Funcionalidades do MVP
- ✅ Dashboard com visão geral
- ✅ Cadastro de materiais (interface pronta)
- 🔄 Cadastro de receitas com associação aos materiais
- 🔄 Módulo de precificação automática
- 🔄 Cadastro de produtos
- 🔄 Gerenciamento de estoque de produtos acabados
- 🔄 Cadastro de clientes
- 🔄 Registro e controle de pedidos

## 👥 Equipe
- Gerente de Projeto
- Frontend
- Backend
- UI/UX Designer
- DevOps
- Cliente (Samyra)

## 📊 Critérios de Sucesso (ISO 25010)
- ✅ Interface validada pela usuária
- 🔄 95% de sucesso nos testes
- 🔄 Sistema sem travamentos
- ✅ Código modular e versionado
- ✅ Acesso multiplataforma via navegador 