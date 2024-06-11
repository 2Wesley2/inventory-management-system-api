# Inventory Management System API

## Introdução

A Inventory Management System API é uma API RESTful desenvolvida para gerenciar produtos, categorias, pedidos de compra, pedidos de clientes, funcionários, movimentações de produtos e emissão de notas fiscais. O objetivo é facilitar o controle de estoque, compras e vendas em um ambiente de loja ou armazém.

## Instalação

### Pré-requisitos

- Node.js v14 ou superior
- MongoDB v4.4 ou superior

### Passos para Instalação

1. Clone o repositório:

    ```bash
   git clone https://github.com/seu-usuario/inventory-management-system-api.git
   cd inventory-management-system-api
    ```

2. Instale as dependências:

    ```bash
   npm install
    ```

3. Criearquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```.env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/inventory-management
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

## Uso

### Exemplos de Requisições

#### Usando cURL

- **Registrar Usuário:**

  ```bash
  curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d '{"name":"Test User", "email":"test.user@example.com", "password":"password123"}'
  ```

- **Login de Usuário:**

  ```bash
  curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"email":"test.user@example.com", "password":"password123"}'
  ```

#### Usando Postman

1. Abra o Postman.
2. Configure a URL, método HTTP, e o corpo da requisição conforme os exemplos fornecidos na seção de Endpoints.
3. Envie a requisição e veja a resposta na interface do Postman.

## Endpoints

### Usuários

- **Registrar Usuário**
  - **Rota:** `/api/users/register`
  - **Método:** POST
  - **Parâmetros:**
    - `name` (string, obrigatório)
    - `email` (string, obrigatório)
    - `password` (string, obrigatório)
  - **Exemplo de Requisição:**

    ```json
    {
      "name": "Test User",
      "email": "test.user@example.com",
      "password": "password123"
    }
    ```

  - **Exemplo de Resposta:**

    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login de Usuário**
  - **Rota:** `/api/users/login`
  - **Método:** POST
  - **Parâmetros:**
    - `email` (string, obrigatório)
    - `password` (string, obrigatório)
  - **Exemplo de Requisição:**

    ```json
    {
      "email": "test.user@example.com",
      "password": "password123"
    }
    ```

  - **Exemplo de Resposta:**

    ```json
    {
      "message": "Login successful",
      "token": "jwt-token"
    }
    ```

### Produtos

- **Adicionar Produto**
  - **Rota:** `/api/products/add`
  - **Método:** POST
  - **Parâmetros:**
    - `name` (string, obrigatório)
    - `price` (number, obrigatório)
    - `quantity` (number, obrigatório)
    - `category` (string, obrigatório)
    - `supplier` (string, obrigatório)
  - **Exemplo de Requisição:**

    ```json
    {
      "name": "Test Product",
      "price": 100,
      "quantity": 50,
      "category": "Test Category",
      "supplier": "Test Supplier"
    }
    ```

  - **Exemplo de Resposta:**

    ```json
    {
      "message": "Product added successfully"
    }
    ```

- **Editar Produto**
  - **Rota:** `/api/products/edit/:id`
  - **Método:** PUT
  - **Parâmetros:**
    - `id` (string, obrigatório, ID do produto)
    - Campos a serem atualizados no corpo da requisição (e.g., `price`, `quantity`)
  - **Exemplo de Requisição:**

    ```json
    {
      "price": 150
    }
    ```

  - **Exemplo de Resposta:**

    ```json
    {
      "message": "Product updated successfully",
      "product": {
        "_id": "66688bac279dd595bea2576e",
        "name": "Test Product",
        "price": 150,
        "quantity": 50,
        "category": "Test Category",
        "supplier": "Test Supplier",
        "dateAdded": "2024-06-11T17:38:52.443Z",
        "__v": 0
      }
    }
    ```

- **Excluir Produto**
  - **Rota:** `/api/products/delete/:id`
  - **Método:** DELETE
  - **Parâmetros:**
    - `id` (string, obrigatório, ID do produto)
  - **Exemplo de Requisição:**

    ```text
    DELETE /api/products/delete/66688bac279dd595bea2576e
    ```

  - **Exemplo de Resposta:**

    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

- **Listar Produtos**
  - **Rota:** `/api/products/list`
  - **Método:** GET
  - **Exemplo de Resposta:**

    ```json
    [
      {
        "_id": "66688bac279dd595bea2576e",
        "name": "Test Product",
        "price": 100,
        "quantity": 50,
        "category": "Test Category",
        "supplier": "Test Supplier",
        "dateAdded": "2024-06-11T17:38:52.443Z",
        "__v": 0
      }
    ]
    ```

- **Buscar Produto**
  - **Rota:** `/api/products/search`
  - **Método:** GET
  - **Parâmetros:**
    - `type` (string, obrigatório, tipo de busca, e.g., `name`, `category`)
    - `value` (string, obrigatório, valor a ser buscado)
  - **Exemplo de Requisição:**

    ```text
    GET /api/products/search?type=name&value=Test Product
    ```

  - **Exemplo de Resposta:**

    ```json
    [
      {
        "_id": "66688bac279dd595bea2576e",
        "name": "Test Product",
        "price": 100,
        "quantity": 50,
        "category": "Test Category",
        "supplier": "Test Supplier",
        "dateAdded": "2024-06-11T17:38:52.443Z",
        "__v": 0
      }
    ]
    ```

### Outras Entidades

Para cada entidade (Categorias, Pedidos de Compra, Pedidos de Clientes, Funcionários, Movimentação de Produtos e Notas Fiscais), siga o mesmo formato, substituindo as rotas, métodos, parâmetros e exemplos conforme necessário.

## Autenticação

Atualmente, a API não requer autenticação para os endpoints fornecidos. No entanto, você pode implementar autenticação baseada em tokens (e.g., JWT) conforme necessário.

## Erros Comuns

- **Erro 400:** Requisição malformada. Verifique os parâmetros e o corpo da requisição.
- **Erro 404:** Recurso não encontrado. Verifique se o ID fornecido está correto.
- **Erro 500:** Erro interno do servidor. Verifique os logs do servidor para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o repositório.
2. Crie uma nova branch:

   ```npm
   git checkout -b feature/nova-funcionalidade
   ```

3. Faça suas alterações e commit:

   ```npm
   git commit -m "Adiciona nova funcionalidade"
   ```

4. Envie para o repositório remoto:

   ```npm
   git push origin feature/nova-funcionalidade
   ```

5. Abra um Pull Request.
