
# Desafio Login com Access Token

## Sobre o projeto

Projeto desenvolvido para demonstrar a criação de uma página de login integrada a uma API, utilizando JWT (JSON Web Token) para autenticação.

O sistema permite que o usuário informe seu e-mail e senha e receba um access_token após a validação das credenciais.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- JSON Web Token (JWT)

## Estrutura do projeto

```text
DesafioLoginToken/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Funcionalidades

- Página de login.
- Envio de credenciais para a API.
- Validação de e-mail e senha.
- Geração de access_token utilizando JWT.
- Armazenamento do token na sessão do navegador.
- Validação do token em rota protegida.

## Como executar o projeto

### 1. Instalação

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 2. Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

```env
PORT=3000
JWT_SECRET=chave_secreta_desafio_login_2026
JWT_EXPIRES_IN=1h
```

### 3. Executar a API

No terminal, execute:

```bash
npm run dev
```

Após iniciar, acesse pelo navegador:

http://localhost:3000

## Como testar o login

Utilize as seguintes credenciais:

- **E-mail:** admin@teste.com
- **Senha:** 123456

Preencha os campos da página e clique em **Entrar**.

Se os dados estiverem corretos, a API retornará um access_token, que será exibido na tela.

## Como testar pelo Insomnia

### 1. Realizar login

Crie uma requisição com as seguintes configurações:

- **Método:** POST
- **URL:** `http://localhost:3000/login`
- **Body:** JSON

Utilize os seguintes dados:

```json
{
    "email": "admin@teste.com",
    "senha": "123456"
}
```

A resposta deverá apresentar uma mensagem de sucesso e o access_token gerado pela API.

### 2. Validar o access_token

Crie uma nova requisição:

- **Método:** GET
- **URL:** `http://localhost:3000/perfil`

Na opção Authorization:

- Selecione **Bearer Token**.
- Cole o access_token recebido no login.

Se o token estiver válido, a API retornará os dados do usuário e uma mensagem de confirmação.

## Testes de erro

Também é possível testar diferentes situações:

| Situação | Resultado esperado |
|---|---|
| Login correto | Status 200 |
| E-mail incorreto | Status 401 |
| Senha incorreta | Status 401 |
| Campos vazios | Status 400 |
| Token não informado | Status 401 |
| Token inválido ou expirado | Status 401 |

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/login` | Realiza a autenticação e gera o access_token |
| GET | `/perfil` | Valida o token e retorna os dados do usuário |

## Observação

O arquivo `.env` contém configurações privadas e não deve ser enviado ao GitHub.

As credenciais utilizadas no projeto são fixas e servem apenas para fins de demonstração do desafio.
