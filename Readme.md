# 📦 Estoque de Armazém API

O projeto consiste de uma **API RESTful** para gerenciamento de estoque de um armazém, permitindo o controle completo de:
 - Categorias de produtos;
 - Produtos;
 - Movimentações de estoque;

## 🚀 Escolhas de Tecnologias e Justificativas

- Linguagem: TypeScript -> Devido ao melhor suporte a tipagem, manutenção e legibilidade. Além de maior afinidade pessoal.

- Framework: Fastify -> Torna o código mais rápido e performático, também é ideal para os requisitos obrigatórios de performance (até 100 req/s e resposta ≤200ms) e prazo reduzido do projeto.

- ORM: Prisma -> Perfeito para combar com o SQLite (requisito obrigatório) com um bom suporte para ele, além de facilitar o mapeamento objeto-relacional, geração automática de tipagens e é mais fácil de integrar em prazos curtos.

- Banco de dados: SQLite -> Requisito obrigatório do projeto, é simples, leve, sem necessidade de configuração de servidor, perfeito para protótipos e desenvolvimento local.

- Validação: Nativa (sem libs externas) -> Outro requisito obrigatório, utilizarei DTOs + validações manuais.

📌 Versões

- Node.js: v22.20.0

- TypeScript: 5.9.2

- Fastify: 5.6.1

- Prisma: 6.16.2

## 📌 Arquitetura

-> Padrão: MVC 

- controllers -> recebe as requisições, chama os services, e retorna respostas HTTP.

- services -> contêm as regras de negócio: estoque, validação do SKU, impedir estoque negativo.

- repositories -> Comunicação com o banco via Prisma. Nenhum controller irá chamar Prisma direto.

- routes -> agrupam endpoints do Fastify e conectam controllers.

- prisma -> onde ficam os modelos do banco, o 'schema.prisma'.


## ▶️ Executando o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/EduSantoss/estoque-armazem-api.git
cd estoque-armazem
```

### 3. Configure as variáveis de ambiente

```bash
cp DATABASE_URL="file:./prisma/dev.db" ou DATABASE_URL="file:./dev.db"

# chave padrão para o SQlite
```


### 3. Instale as dependências

```bash
npm install
```

### 4. Gerar Prisma Client

```bash
npm run dev
```

### 5. Execute a aplicação

```bash
npm run dev
```

## OBS: Optei por enviar o dev.db para o repositório, então não é necessário rodar migrate/seed.
