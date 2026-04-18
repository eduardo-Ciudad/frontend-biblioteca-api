# 📚 Frontend — Biblioteca API

Interface web para o sistema de gerenciamento de biblioteca, consumindo a [biblioteca-api](https://github.com/educiudad/biblioteca-api) (Spring Boot + MySQL).

> Permite cadastrar livros, usuários e gerenciar empréstimos diretamente pelo navegador, sem necessidade de ferramentas externas como Insomnia ou Postman.

---

## 🖥️ Demo

🔗 **[Acesse o frontend ao vivo](#)** *(substitua pelo link do GitHub Pages ou Netlify)*

API em produção: `https://biblioteca-api-nqwi.onrender.com`

---

## ✨ Funcionalidades

- **Livros** — listar, cadastrar e remover livros do acervo
- **Usuários** — listar, cadastrar e remover usuários
- **Empréstimos** — registrar empréstimos, visualizar em aberto e registrar devoluções

---

## 🗂️ Estrutura do Projeto

```
frontend-biblioteca-api/
├── css/
│   └── style.css          # Estilização global
├── js/
│   ├── api.js             # Camada de comunicação com a API REST
│   ├── livros.js          # Lógica da página de livros
│   ├── usuarios.js        # Lógica da página de usuários
│   ├── emprestimos.js     # Lógica da página de empréstimos
│   └── utils.js           # Funções utilitárias compartilhadas
├── index.html             # Página inicial
├── livros.html            # Página de livros
├── usuarios.html          # Página de usuários
├── emprestimos.html       # Página de empréstimos
└── README.md
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização |
| JavaScript (Vanilla) | Lógica e consumo da API |
| Fetch API | Requisições HTTP |

Sem frameworks ou dependências externas — HTML, CSS e JavaScript puro.

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [biblioteca-api](https://github.com/educiudad/biblioteca-api) rodando localmente na porta `8080`
- Qualquer servidor HTTP local (recomendado: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/educiudad/frontend-biblioteca-api.git
cd frontend-biblioteca-api

# 2. Aponte a API para o ambiente local
# Em js/api.js, altere:
const API_URL = "http://localhost:8080";

# 3. Abra o index.html com Live Server ou qualquer servidor HTTP
```

> ⚠️ Abrir o `index.html` diretamente pelo sistema de arquivos (`file://`) pode causar erros de CORS. Use um servidor local.

---

## 🌐 Variável de Ambiente da API

A URL base da API é definida no topo de `js/api.js`:

```javascript
const API_URL = "https://biblioteca-api-nqwi.onrender.com";
```

Para apontar para o ambiente local, substitua pela URL do seu backend.

---

## 📡 Endpoints Consumidos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/livros` | Lista todos os livros |
| `POST` | `/livros` | Cadastra um livro |
| `DELETE` | `/livros/{id}` | Remove um livro |
| `GET` | `/usuarios` | Lista todos os usuários |
| `POST` | `/usuarios` | Cadastra um usuário |
| `DELETE` | `/usuarios/{id}` | Remove um usuário |
| `GET` | `/emprestimos` | Lista todos os empréstimos |
| `POST` | `/emprestimos` | Registra um empréstimo |
| `PUT` | `/emprestimos/{id}/devolucao` | Registra devolução |
| `DELETE` | `/emprestimos/{id}` | Remove um empréstimo |

---

## 🔗 Repositório da API

O backend que este frontend consome está disponível em:
👉 [github.com/educiudad/biblioteca-api](https://github.com/educiudad/biblioteca-api)

---

## 👨‍💻 Autor

**Eduardo** — [@educiudad](https://github.com/educiudad)