# 📦 Estoque de Armazém API

**API RESTful** para gerenciamento de estoque de um armazém, permitindo o controle completo de:
 - Categorias de produtos;
 - Produtos;
 - Movimentações de estoque;

## 🚀 Escolha de Tecnologias e Justificativas

- **Linguagem:** TypeScript -> Devido ao melhor suporte a tipagem, manutenção e legibilidade. Além de maior afinidade pessoal.

- **Framework:** Fastify -> Torna o código mais rápido e performático, também é ideal para os requisitos obrigatórios de performance (até 100 req/s e resposta ≤200ms) e prazo reduzido do projeto.

- **ORM:** Prisma -> Perfeito para combar com o SQLite (requisito obrigatório) com um bom suporte para ele, além de facilitar o mapeamento objeto-relacional, geração automática de tipagens e é mais fácil de integrar em prazos curtos.

- **Banco de dados:** SQLite -> Requisito obrigatório do projeto, é simples, leve, sem necessidade de configuração de servidor, perfeito para protótipos e desenvolvimento local.

- **Validação:** Nativa (sem libs externas) -> Outro requisito obrigatório, validações manuais.

📌 **Versões utilizadas no desenvolvimento**

- Node.js: v22.20.0

- TypeScript: 5.9.2

- Fastify: 5.6.1

- Prisma: 6.16.2

## 📌 Arquitetura

Padrão: **MVC (Model-View-Controller)** 

- **controllers** -> recebe as requisições, chama os services, e retorna respostas HTTP.

- **services** -> contêm as regras de negócio: estoque, validação do SKU, impedir estoque negativo.

- **repositories** -> Comunicação com o banco via Prisma. Nenhum controller irá chamar Prisma direto.

- **routes** -> agrupam endpoints do Fastify e conectam controllers.

- **prisma**-> onde ficam os modelos do banco, o (`schema.prisma`), migrations e `dev.db`.


## ▶️ Executando o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/EduSantoss/estoque-armazem-api.git
cd estoque-armazem
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

-> Conteúdo esperado no .env:
```bash
DATABASE_URL="file:./prisma/dev.db" ou DATABASE_URL="file:./dev.db"
# chave padrão para o SQlite
```
⚠️ O arquivo dev.db já foi incluído no repositório, então não é necessário rodar migrations ou seed manualmente.

### 3. Instale as dependências

```bash
npm install
```

### 4. Gerar Prisma Client

```bash
npm prisma generate
```

### 5. Abrir prisma studio

```bash
npx prisma studio
# permite melhor visualização e alteração do banco, perfeito para testes.
```

### 6. Execute a aplicação

```bash
npm run dev
```

A API estará disponível em:
👉 http://localhost:3000


## 📚 Endpoints da API

### 🔹 Categorias

➤ Listar todas

`GET /categories`

Exemplo de resposta:

```bash
[
  {
    "id": 1,
    "name": "Alimentos",
    "createdAt": "2025-09-24T15:32:00.000Z"
    "products": [

    ]
  }
]
```

➤ Criar categoria

`POST /categories`

Body: 
```bash
{
  "name": "Limpeza"
}
```

➤ Deletar categoria

`DELETE /categories/:id`

### 🔹 Produtos

➤ Listar todos

`GET /product`

Exemplo de resposta:
```bash
{
  "id": 1,
  "name": "Arroz Branco",
  "sku": "SKU-001",
  "categoryId": 1,
  "createdAt": "2025-09-26T07:57:11.172Z",
  "category": {
      "id": 1,
      "name": "Alimentos",
      "createdAt": "2025-09-26T07:57:11.106Z"
    },
    "stock": {
      "id": 1,
      "quantity": 100,
      "productId": 1,
      "createdat": "2025-09-26T07:57:11.172Z"
}
```

➤ Criar produto

`POST /product`

Body:
```bash
{
  "name": "Arroz",
  "sku": "Alimentos-001",
  "categoryId": 1,
  "quantity": 50
}
```

➤ Buscar por ID

`GET /product/:id`

### 🔹 Movimentações

➤ Listar movimentações

`GET /movements`

Exemplo de resposta: 
```bash
{
  "id": 1,
  "type": "IN",
  "quantity": 100,
  "stockId": 1,
  "createdAt": "2025-09-26T07:57:11.257Z"
}
```

➤ Buscar por ID

`GET /movements/:productId`

### 🔹 Estoques

➤ Lista estoques

`GET /stocks`

Exemplo de resposta:
```bash
{
        "id": 1,
        "quantity": 100,
        "productId": 1,
        "createdat": "2025-09-26T07:57:11.172Z",
        "product": {
            "id": 1,
            "name": "Arroz Branco",
            "sku": "SKU-001",
            "categoryId": 1,
            "createdAt": "2025-09-26T07:57:11.172Z"
        },
        "movements": [
            {
                "id": 1,
                "type": "IN",
                "quantity": 100,
                "stockId": 1,
                "createdAt": "2025-09-26T07:57:11.257Z"
            }
        ]
    },
```

➤ Buscar por ID do Produto

`GET /stocks/productId`

## 📌 Observações

- O arquivo `prisma/dev.db` já está incluído no repositório para facilitar a execução do projeto.

- Caso queira recriar o banco do zero, basta deletar `dev.db` e rodar:

```bash
npx prisma migrate dev --name init
npm run seed
```

- Validações são manuais, sem bibliotecas externas, respeitando os requisitos do desafio técnico.

## 👨‍💻 Autor

Desenvolvido por Eduardo Santos 🚀