# Backend - Sistema de Gestão para Confeiteira

API REST desenvolvida com Spring Boot para o sistema de gestão da confeitaria "Delícias da Samy".

## 🛠️ Tecnologias
- **Java 17**
- **Spring Boot 3.5.2**
- **Spring Data JPA**
- **PostgreSQL 14**
- **Gradle**

## 📁 Estrutura do Projeto
```
src/
├── main/
│   ├── java/com/example/demo/
│   │   ├── DemoApplication.java          # Classe principal
│   │   ├── controllers/                  # Controladores REST
│   │   ├── services/                     # Lógica de negócio
│   │   ├── repositories/                 # Repositórios JPA
│   │   ├── entities/                     # Entidades JPA
│   │   └── dto/                          # Data Transfer Objects
│   └── resources/
│       └── application.properties        # Configurações do banco
└── test/                                 # Testes unitários
```

## 🚀 Como Executar

### Pré-requisitos
- Java 17 ou superior
- PostgreSQL 14+ rodando
- Gradle (incluído no projeto)

### Configuração do Banco
1. Certifique-se de que o PostgreSQL está rodando
2. Crie o banco de dados:
   ```sql
   CREATE DATABASE confeitaria;
   CREATE USER confeiteiro WITH ENCRYPTED PASSWORD 'minhasenha';
   GRANT ALL PRIVILEGES ON DATABASE confeitaria TO confeiteiro;
   ```

3. Configure as credenciais em `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/confeitaria
   spring.datasource.username=confeiteiro
   spring.datasource.password=minhasenha
   ```

### Executando a Aplicação
```bash
./gradlew bootRun
```

A API estará disponível em: http://localhost:8080

## 📋 Status Atual

### ✅ Implementado
- Configuração básica do Spring Boot
- Conexão com PostgreSQL
- Estrutura de pastas organizada
- Configuração JPA/Hibernate

### 🔄 Próximos Passos
- [ ] Criar entidades JPA (Material, Receita, Produto, Cliente, Pedido)
- [ ] Implementar repositórios
- [ ] Criar serviços de negócio
- [ ] Desenvolver controladores REST
- [ ] Implementar validações
- [ ] Adicionar tratamento de erros
- [ ] Configurar CORS para integração com frontend

## 🔗 Endpoints Planejados

### Materiais
- `GET /api/materiais` - Listar materiais
- `POST /api/materiais` - Criar material
- `PUT /api/materiais/{id}` - Atualizar material
- `DELETE /api/materiais/{id}` - Excluir material

### Receitas
- `GET /api/receitas` - Listar receitas
- `POST /api/receitas` - Criar receita
- `GET /api/receitas/{id}/custo` - Calcular custo da receita

### Produtos
- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Criar produto
- `PUT /api/produtos/{id}/estoque` - Atualizar estoque

### Clientes
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente

### Pedidos
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Criar pedido
- `PUT /api/pedidos/{id}/status` - Atualizar status

## 🧪 Testes
```bash
./gradlew test
```

## 📦 Build
```bash
./gradlew build
```

O arquivo JAR será gerado em: `build/libs/demo-0.0.1-SNAPSHOT.jar`

## 🔧 Configurações Adicionais

### Logs
Configure o nível de log em `application.properties`:
```properties
logging.level.com.example.demo=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### Porta
Para alterar a porta padrão:
```properties
server.port=8081
``` 