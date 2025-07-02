# Sistema de Gestão de Receitas - Delícias da Samy

Sistema completo para gerenciamento de receitas, materiais, estoque e pedidos de uma confeitaria.

## 🏗️ Arquitetura

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Spring Boot 3.5 + Java 17 + PostgreSQL
- **Banco de Dados**: PostgreSQL

## 🚀 Como Executar o Projeto

### 1. Configurar o Banco de Dados PostgreSQL

1. Certifique-se de que o PostgreSQL está instalado e rodando:
   ```bash
   sudo service postgresql start
   sudo service postgresql status
   ```
   O status deve mostrar algo como `online`.

2. Crie o banco e o usuário (caso ainda não existam):
   ```sql
   sudo -u postgres psql
   CREATE DATABASE confeitaria;
   CREATE USER confeiteiro WITH PASSWORD 'minhasenha';
   GRANT ALL PRIVILEGES ON DATABASE confeitaria TO confeiteiro;
   \q
   ```

### 2. Executar o Backend (Spring Boot)

Abra um terminal e rode:
```bash
cd backend
./gradlew bootRun
```
- Aguarde até aparecer a mensagem:
  `Tomcat started on port 8080 (http) with context path '/'`
- O terminal ficará "preso" rodando o servidor. Isso é normal!
- **Dica:** Se quiser rodar em segundo plano, use:
  ```bash
  nohup ./gradlew bootRun &
  ```
  E para ver os logs:
  ```bash
  tail -f nohup.out
  ```

O backend estará disponível em: http://localhost:8080

### 3. Executar o Frontend (Next.js)

Abra outro terminal e rode:
```bash
cd frontend
npm install
npm run dev
```
O frontend estará disponível em: http://localhost:3000

### 4. Autenticação e Uso do Token JWT
- Faça login na interface web para obter o token JWT.
- O token é salvo automaticamente e enviado em todas as requisições protegidas.
- Se usar a API manualmente (ex: via curl/Postman), envie o header:
  ```
  Authorization: Bearer SEU_TOKEN_AQUI
  ```

### 5. Testar o Sistema
- Acesse http://localhost:3000 para usar a interface web.
- Teste a API do backend em http://localhost:8080/api/materiais (pode usar navegador ou Postman).

### 6. Parar o Backend
- Se rodou em segundo plano, pare com:
  ```bash
  pkill -f 'gradlew bootRun'
  ```
- Se rodou no terminal, basta pressionar `Ctrl+C`.

---

## ✅ Funcionalidades

### Dashboard
- Visão geral do sistema
- Estatísticas de materiais, receitas e pedidos
- Alertas de estoque baixo
- Receitas mais populares

### Gestão de Materiais
- Cadastro, edição e exclusão de materiais
- Controle de estoque
- Categorização por tipo
- Preços e fornecedores

### Gestão de Receitas
- Cadastro completo de receitas
- Lista de ingredientes com quantidades
- Instruções de preparo
- Cálculo automático de custos

### Gestão de Pedidos
- Cadastro, edição e exclusão de pedidos
- Associação de receitas aos pedidos
- Atualização de status

### Controle de Estoque
- Movimentações de entrada e saída
- Alertas de estoque mínimo
- Histórico de movimentações
- Relatórios de estoque

### Autenticação
- Login com JWT
- Proteção de rotas e APIs

## 🗄️ Estrutura do Banco

### Tabelas Principais
- `materiais`: Cadastro de ingredientes
- `receitas`: Cadastro de receitas
- `receita_materiais`: Relação entre receitas e materiais
- `movimentacoes_estoque`: Histórico de movimentações
- `pedidos`: Cadastro de pedidos
- `receita_pedidos`: Relação entre receitas e pedidos

## 🔗 APIs Disponíveis

### Materiais
- `GET /api/materiais` - Listar todos os materiais
- `GET /api/materiais/{id}` - Buscar material por ID
- `POST /api/materiais` - Criar novo material
- `PUT /api/materiais/{id}` - Atualizar material
- `DELETE /api/materiais/{id}` - Excluir material
- `GET /api/materiais/estoque-baixo` - Materiais com estoque baixo
- `PUT /api/materiais/{id}/estoque` - Atualizar estoque

### Receitas
- `GET /api/receitas` - Listar todas as receitas
- `POST /api/receitas` - Criar nova receita
- `GET /api/receitas/{id}` - Buscar receita por ID
- `PUT /api/receitas/{id}` - Atualizar receita
- `DELETE /api/receitas/{id}` - Excluir receita

### Pedidos
- `GET /api/pedidos` - Listar todos os pedidos
- `POST /api/pedidos` - Criar novo pedido
- `GET /api/pedidos/{id}` - Buscar pedido por ID
- `PUT /api/pedidos/{id}` - Atualizar pedido
- `DELETE /api/pedidos/{id}` - Excluir pedido

### Dashboard
- `GET /api/dashboard` - Visualizar estatísticas do sistema

## 🎨 Interface

- Visual moderno, aconchegante e responsivo
- Tabelas destacadas com zebra, sombra e cabeçalho colorido
- Navegação por abas
- Modais para formulários
- Dashboard com gráficos

## 📦 Dados de Exemplo

O sistema já vem com dados de exemplo incluindo:
- 8 materiais diferentes
- 4 receitas completas
- Relacionamentos entre receitas e materiais
- 2 pedidos completos

## 🔄 Próximos Passos

- [ ] Relatórios avançados
- [ ] Sistema de notificações
- [ ] Backup automático

## 🛠️ Tecnologias Utilizadas

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS 4
- React 19

### Backend
- Spring Boot 3.5
- Spring Data JPA
- PostgreSQL
- Java 17

## 📝 Licença

Este projeto é de uso educacional e comercial.
