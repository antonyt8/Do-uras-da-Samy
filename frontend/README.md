# Frontend - Delícias da Samy

Interface web desenvolvida em Next.js para o sistema de gestão da confeitaria "Delícias da Samy".

## 🚀 Como rodar o frontend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## ⚙️ Tecnologias
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4

## 🔐 Autenticação
- O login gera um token JWT salvo no localStorage.
- O token é enviado automaticamente em todas as requisições protegidas.
- O sistema protege rotas e exibe telas diferentes para usuários autenticados.

## 🎨 Visual
- Tabelas com fundo destacado, zebra, sombra e cabeçalho colorido
- Dashboard com gráficos
- Layout responsivo e aconchegante

## 🔗 Integração
- O frontend se comunica com o backend em http://localhost:8080
- Certifique-se de que o backend está rodando para acessar dados reais.

## 📦 Scripts úteis
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm run start` — roda build de produção

## 📁 Estrutura principal
- `src/app/components/` — componentes de UI (tabelas, formulários, dashboard)
- `src/app/page.tsx` — página principal

## 📝 Observações
- Para customizar variáveis de ambiente, edite `.env.local` (se necessário)
- O projeto utiliza autenticação JWT e integração CORS com o backend
