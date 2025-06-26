# Banco de Dados - Sistema de Gestão para Confeiteira

Scripts e configurações do banco de dados PostgreSQL para o sistema de gestão da confeitaria "Delícias da Samy".

## 🛠️ Tecnologia
- **PostgreSQL 14+**

## 📋 Configuração Atual

### Banco de Dados
- **Nome**: `confeitaria`
- **Usuário**: `confeiteiro`
- **Senha**: `minhasenha`
- **Host**: `localhost`
- **Porta**: `5432`

### Scripts de Criação
```sql
-- Criar banco de dados
CREATE DATABASE confeitaria;

-- Criar usuário
CREATE USER confeiteiro WITH ENCRYPTED PASSWORD 'minhasenha';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE confeitaria TO confeiteiro;
```

## 📁 Estrutura Planejada

### Tabelas Principais

#### 1. materiais
```sql
CREATE TABLE materiais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50) NOT NULL,
    unidade VARCHAR(10) NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    fornecedor VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. receitas
```sql
CREATE TABLE receitas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    instrucoes TEXT,
    tempo_preparo INTEGER, -- em minutos
    rendimento VARCHAR(50), -- ex: "12 unidades"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. receita_materiais
```sql
CREATE TABLE receita_materiais (
    id SERIAL PRIMARY KEY,
    receita_id INTEGER REFERENCES receitas(id),
    material_id INTEGER REFERENCES materiais(id),
    quantidade DECIMAL(10,3) NOT NULL,
    unidade VARCHAR(10) NOT NULL
);
```

#### 4. produtos
```sql
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    receita_id INTEGER REFERENCES receitas(id),
    preco_venda DECIMAL(10,2) NOT NULL,
    estoque_atual INTEGER DEFAULT 0,
    estoque_minimo INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. clientes
```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco TEXT,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. pedidos
```sql
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_entrega TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDENTE', -- PENDENTE, EM_PREPARO, PRONTO, ENTREGUE, CANCELADO
    valor_total DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 7. pedido_itens
```sql
CREATE TABLE pedido_itens (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);
```

## 🔄 Status Atual

### ✅ Configurado
- Banco de dados criado
- Usuário com privilégios
- Conexão com Spring Boot funcionando

### 🔄 Próximos Passos
- [ ] Criar scripts de criação das tabelas
- [ ] Implementar migrações com Flyway ou Liquibase
- [ ] Criar dados de exemplo (seed data)
- [ ] Implementar backup automático
- [ ] Configurar índices para performance

## 📊 Índices Recomendados

```sql
-- Índices para melhorar performance
CREATE INDEX idx_materiais_categoria ON materiais(categoria);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_data ON pedidos(data_pedido);
CREATE INDEX idx_pedido_itens_pedido ON pedido_itens(pedido_id);
```

## 🔧 Manutenção

### Backup
```bash
pg_dump -h localhost -U confeiteiro confeitaria > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore
```bash
psql -h localhost -U confeiteiro confeitaria < backup_file.sql
```

### Verificar Conexão
```bash
psql -h localhost -U confeiteiro -d confeitaria
```

## 📈 Monitoramento

### Queries Úteis
```sql
-- Verificar tamanho do banco
SELECT pg_size_pretty(pg_database_size('confeitaria'));

-- Verificar tabelas maiores
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🚀 Próximas Implementações

### Migrações
- Implementar sistema de migrações para controle de versão do banco
- Usar Flyway ou Liquibase para gerenciar mudanças

### Dados de Exemplo
- Criar scripts com dados de exemplo para testes
- Incluir materiais, receitas e produtos comuns

### Backup Automático
- Configurar backup diário
- Implementar retenção de backups 