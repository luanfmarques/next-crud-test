# Next.js CRUD Users

Um projeto de exemplo para um CRUD (Create, Read, Update, Delete) usando Next API. Este projeto utiliza várias tecnologias modernas para criar uma aplicação escalável e de alta qualidade.

Link do projeto hospedado na Vercel: <https://next-crud-test.vercel.app/users>

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicações React com renderização do lado do servidor.
- **Prisma**: ORM para gerenciar o banco de dados.
- **React Hook Form**: Biblioteca para gerenciar formulários.
- **Zod**: Biblioteca para validação de esquemas.
- **React Query**: Biblioteca para gerenciamento de estados e dados assíncronos.
- **Axios**: Cliente HTTP para fazer requisições.
- **Tailwind CSS**: Framework CSS para estilização.
- **Playwright**: Framework para testes end-to-end.
- **React Toastify**: Biblioteca para exibição de toasts.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/luanfmarques/next-crud-test.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd next-crud-test
   ```

3. Instale as dependências:

   ```bash
   yarn install
   ```

## Scripts

- **`yarn dev`**: Inicia o servidor de desenvolvimento.
- **`yarn build`**: Cria uma versão de produção do projeto.
- **`yarn start`**: Inicia o servidor de produção.
- **`yarn lint`**: Executa a verificação de linting no código.

## Estrutura do Projeto

- **`/api`**: Contém a lógica utilizada para as rotas e métodos do backend.
- **`/app`**: Contém as rotas da aplicação.
- **`/components`**: Contém os componentes reutilizáveis.
- **`/prisma`**: Contém a configuração do Prisma e o esquema do banco de dados.
- **`/queries`**: Contém os hooks para facilitar nas requisições utilizadas no CRUD.
- **`_tests_`**: Contém os testes end-to-end utilizando Playwright.

## Configuração do Prisma

1. Configure seu banco de dados no criando o arquivo `.env` baseado no `.env.example`:

   ```bash
   POSTGRES_URL="************"
   POSTGRES_PRISMA_URL="************"
   POSTGRES_URL_NO_SSL="************"
   POSTGRES_URL_NON_POOLING="************"
   POSTGRES_USER="************"
   POSTGRES_HOST="************"
   POSTGRES_PASSWORD="************"
   POSTGRES_DATABASE="************"
   ```

2. Execute as migrações para configurar o banco de dados:

   ```bash
   npx prisma migrate dev --name init
   ```

## Testes

Para rodar os testes end-to-end com Playwright, utilize o comando:

```bash
yarn test
```
