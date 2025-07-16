# Sistema de Gestão de Receitas - Delícias da Samy

Um sistema completo para gerenciamento de receitas, materiais, estoque e pedidos de uma confeitaria.

-----

## 🏗️ Arquitetura

  * **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
  * **Backend**: Spring Boot 3.5 + Java 17 + PostgreSQL
  * **Banco de Dados**: PostgreSQL

-----

## 🚀 Como Executar o Projeto

Para colocar o projeto "Delícias da Samy" em funcionamento, siga os passos abaixo:

### 1\. Configurar o Banco de Dados PostgreSQL

Certifique-se de que o PostgreSQL esteja **instalado e em execução**. Você pode verificar o status e iniciar o serviço (se necessário) com os seguintes comandos:

```bash
sudo service postgresql start
sudo service postgresql status
```

O status deve indicar `online`.

Em seguida, crie o banco de dados e o usuário para a aplicação. Acesse o terminal PostgreSQL como o usuário `postgres` e execute os comandos:

```sql
sudo -u postgres psql
CREATE DATABASE confeitaria;
CREATE USER confeiteiro WITH PASSWORD 'minhasenha';
GRANT ALL PRIVILEGES ON DATABASE confeitaria TO confeiteiro;
\q
```

### 2\. Executar o Backend (Spring Boot)

Navegue até a pasta `backend` no seu terminal e execute o aplicativo Spring Boot:

```bash
cd backend
./gradlew bootRun
```

Aguarde até ver a mensagem `Tomcat started on port 8080 (http) with context path '/'`. Este processo manterá o terminal ocupado, o que é esperado.

**Dica**: Se preferir rodar o backend em segundo plano, use:

```bash
nohup ./gradlew bootRun &
```

Para monitorar os logs, utilize:

```bash
tail -f nohup.out
```

O backend estará disponível em: **http://localhost:8080**

### 3\. Executar o Frontend (Next.js)

Em um **novo terminal**, vá para a pasta `frontend` e instale as dependências, depois inicie o servidor de desenvolvimento:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

### 4\. Autenticação e Uso do Token JWT

Para utilizar o sistema, faça login na interface web. O **token JWT** será salvo automaticamente e enviado em todas as requisições protegidas.

Se você estiver interagindo com a API manualmente (por exemplo, via `curl` ou Postman), inclua o seguinte cabeçalho em suas requisições:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

### 5\. Testar o Sistema

  * Acesse **http://localhost:3000** para interagir com a interface web.
  * Para testar a API do backend diretamente, você pode usar seu navegador ou uma ferramenta como Postman acessando **http://localhost:8080/api/materiais**.

### 6\. Parar o Backend

  * Se o backend estiver rodando em segundo plano, pare-o com:

    ```bash
    pkill -f 'gradlew bootRun'
    ```

  * Se estiver rodando diretamente no terminal, simplesmente pressione `Ctrl+C`.

-----

## ✅ Funcionalidades

O sistema "Delícias da Samy" oferece um conjunto robusto de funcionalidades para a gestão completa de uma confeitaria:

  * **Dashboard**: Visão geral do sistema com estatísticas de materiais, receitas e pedidos, além de alertas de estoque baixo e receitas populares.
  * **Gestão de Materiais**: Controle completo de materiais, incluindo cadastro, edição, exclusão, controle de estoque, categorização, preços e fornecedores.
  * **Gestão de Receitas**: Cadastro detalhado de receitas com lista de ingredientes, quantidades, instruções de preparo e cálculo automático de custos.
  * **Gestão de Pedidos**: Gerenciamento de pedidos, associação de receitas e atualização de status.
  * **Controle de Estoque**: Movimentações de entrada e saída, alertas de estoque mínimo, histórico e relatórios de estoque.
  * **Autenticação**: Sistema de login seguro com JWT e proteção de rotas e APIs.

-----

## 🗄️ Estrutura do Banco de Dados

As **tabelas principais** do banco de dados são:

  * `materiais`: Para o cadastro de ingredientes.
  * `receitas`: Para o cadastro das receitas.
  * `receita_materiais`: Tabela de relacionamento entre receitas e materiais.
  * `movimentacoes_estoque`: Histórico de todas as movimentações de estoque.
  * `pedidos`: Para o cadastro dos pedidos.
  * `receita_pedidos`: Tabela de relacionamento entre receitas e pedidos.

-----

## 🔗 APIs Disponíveis

O backend expõe as seguintes APIs para interação:

### Materiais

  * `GET /api/materiais`: Lista todos os materiais.
  * `GET /api/materiais/{id}`: Busca um material específico por ID.
  * `POST /api/materiais`: Cria um novo material.
  * `PUT /api/materiais/{id}`: Atualiza um material existente.
  * `DELETE /api/materiais/{id}`: Exclui um material.
  * `GET /api/materiais/estoque-baixo`: Lista materiais com estoque baixo.
  * `PUT /api/materiais/{id}/estoque`: Atualiza o estoque de um material.

### Receitas

  * `GET /api/receitas`: Lista todas as receitas.
  * `POST /api/receitas`: Cria uma nova receita.
  * `GET /api/receitas/{id}`: Busca uma receita específica por ID.
  * `PUT /api/receitas/{id}`: Atualiza uma receita existente.
  * `DELETE /api/receitas/{id}`: Exclui uma receita.

### Pedidos

  * `GET /api/pedidos`: Lista todos os pedidos.
  * `POST /api/pedidos`: Cria um novo pedido.
  * `GET /api/pedidos/{id}`: Busca um pedido específico por ID.
  * `PUT /api/pedidos/{id}`: Atualiza um pedido existente.
  * `DELETE /api/pedidos/{id}`: Exclui um pedido.

### Dashboard

  * `GET /api/dashboard`: Retorna estatísticas gerais do sistema.

-----

## 🎨 Interface

A interface do sistema é projetada para ser **moderna, aconchegante e responsiva**, com as seguintes características:

  * Tabelas destacadas com efeito zebra, sombra e cabeçalhos coloridos para melhor visualização.
  * Navegação intuitiva por abas.
  * Modais para formulários de criação e edição.
  * Dashboard com gráficos para visualização rápida de dados.

-----

## 📦 Dados de Exemplo

Para facilitar o início, o sistema já vem com **dados de exemplo** pré-carregados, incluindo:

  * 8 materiais diferentes.
  * 4 receitas completas.
  * Relacionamentos entre as receitas e os materiais.
  * 2 pedidos completos.

-----

## 🔄 Próximos Passos

O projeto está em constante evolução, e as próximas etapas incluem:

  * **Relatórios avançados**: Para análises mais aprofundadas.
  * **Sistema de notificações**: Para alertas proativos sobre o estoque e pedidos.
  * **Backup automático**: Para garantir a segurança dos dados.

-----

## 🛠️ Tecnologias Utilizadas

### Frontend

  * Next.js 15
  * TypeScript
  * Tailwind CSS 4
  * React 19

### Backend

  * Spring Boot 3.5
  * Spring Data JPA
  * PostgreSQL
  * Java 17

-----

## 🌐 Site Online

Você pode acessar a versão online do sistema "Delícias da Samy" através do seguinte link: **[https://sammy-front.onrender.com/](https://sammy-front.onrender.com/)**

-----

## 📝 Licença

Este projeto é disponibilizado para **uso educacional e comercial**.
