# Frontend - Sistema de Gestão para Confeiteira

Interface web moderna desenvolvida com Next.js para o sistema de gestão da confeitaria "Delícias da Samy".

## 🛠️ Tecnologias
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**
- **ESLint**

## 📁 Estrutura do Projeto
```
src/
├── app/
│   ├── components/           # Componentes reutilizáveis
│   │   └── MaterialForm.tsx  # Formulário de materiais
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── public/                  # Arquivos estáticos
└── types/                   # Definições de tipos TypeScript
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

### Build para Produção
```bash
npm run build
npm start
```

## 🎨 Interface Implementada

### ✅ Dashboard
- Visão geral da confeitaria
- Cards com estatísticas (produtos, pedidos, clientes, receita)
- Atividade recente
- Design responsivo

### ✅ Navegação
- Menu lateral com todos os módulos do MVP
- Navegação entre seções
- Indicador visual de seção ativa

### ✅ Módulos Disponíveis
- **Dashboard** - Visão geral e estatísticas
- **Materiais** - Cadastro de ingredientes (formulário funcional)
- **Receitas** - Gestão de receitas (interface preparada)
- **Produtos** - Produtos acabados (interface preparada)
- **Clientes** - Cadastro de clientes (interface preparada)
- **Pedidos** - Controle de pedidos (interface preparada)
- **Estoque** - Gestão de estoque (interface preparada)

## 🧩 Componentes Criados

### MaterialForm
- Formulário modal para cadastro de materiais
- Campos: nome, descrição, categoria, unidade, preço, fornecedor
- Validação de campos obrigatórios
- Interface responsiva

## 📋 Status Atual

### ✅ Implementado
- Interface moderna e responsiva
- Dashboard funcional
- Navegação entre módulos
- Formulário de materiais
- Design system consistente
- Configuração TypeScript

### 🔄 Próximos Passos
- [ ] Criar formulários para outros módulos (Receitas, Produtos, Clientes, Pedidos)
- [ ] Implementar tabelas de listagem de dados
- [ ] Integrar com API do backend
- [ ] Adicionar validações avançadas
- [ ] Implementar autenticação
- [ ] Adicionar notificações e feedback
- [ ] Implementar busca e filtros

## 🎯 Funcionalidades Planejadas

### Formulários
- [x] MaterialForm - Cadastro de materiais
- [ ] ReceitaForm - Cadastro de receitas
- [ ] ProdutoForm - Cadastro de produtos
- [ ] ClienteForm - Cadastro de clientes
- [ ] PedidoForm - Criação de pedidos

### Tabelas
- [ ] MaterialTable - Listagem de materiais
- [ ] ReceitaTable - Listagem de receitas
- [ ] ProdutoTable - Listagem de produtos
- [ ] ClienteTable - Listagem de clientes
- [ ] PedidoTable - Listagem de pedidos

### Funcionalidades Avançadas
- [ ] Cálculo automático de preços
- [ ] Controle de estoque
- [ ] Relatórios e gráficos
- [ ] Exportação de dados

## 🔧 Configurações

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Tailwind CSS
Configurado com tema personalizado para confeitaria:
- Cores principais: rosa/roxo
- Design responsivo
- Componentes customizados

## 📱 Responsividade
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Interface adaptável para tablets e celulares

## 🧪 Testes
```bash
npm run test
```

## 📦 Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run type-check` - Verificação de tipos TypeScript 