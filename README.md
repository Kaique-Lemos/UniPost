# 🧑‍🎓 UniPost – Frontend do Sistema de Alunos

## 📖 Descrição
UniPost é a aplicação frontend do sistema de cadastro de alunos, desenvolvida em **React (Vite)** e estilizada com **Tailwind CSS** e **shadcn/ui**.

Esta interface consome a [API do UniPost_Api (backend)](https://github.com/Kaique-Lemos/UniPost-API.git), permitindo ao usuário cadastrar, listar, editar e excluir alunos. O design é totalmente responsivo, adaptando-se a diferentes dispositivos.

---

## 🚀 Funcionalidades

- ✅ Listar alunos cadastrados (consumindo a API)
- ✅ Cadastrar novos alunos
- ✅ Editar informações existentes
- ✅ Excluir alunos com diálogo de confirmação
- ✅ Integração com backend (Django REST Framework) via Axios
- ✅ Interface responsiva (Mobile-first)
- ✅ Notificações (toasts) de sucesso e erro para todas as ações 

---

## 🧩 Tecnologias Utilizadas

- React.js (Vite)
- Tailwind CSS (Para estilização utilitária e responsividade)
- Shadcn (Biblioteca de componentes, incluindo Tabela, Input, Botão, Alert Dialog e Sonner)
- Axios (Para comunicação com a API)

---

## ⚙️ Estrutura do Projeto

```text
UniPost/ (Frontend)
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── table.jsx
│   │   │   ├── alert-dialog.jsx
│   │   │   ├── input.jsx
│   │   │   └── sonner.jsx
│   ├── App.jsx         (Lógica principal da aplicação)
│   └── index.css     (Configuração base do Tailwind)
│
├── tailwind.config.js  (Configuração do Tailwind)
└── package.json
```

## 🧠 Como Executar o Projeto Localmente

O frontend consome os dados da API Django via Axios, oferecendo a interface para o usuário.

**Pré-requisito:** Para que o frontend funcione, o [backend (UniPost_Api)](https://github.com/Kaique-Lemos/UniPost-API.git) deve estar rodando (normalmente em ```http://127.0.0.1:8000/```).

1️⃣ Clonar o repositório:

```bash
git clone https://github.com/Crystian-Paz/UniPost.git
```

2️⃣Instalar as dependências:

```bash
#Para instalar as Dependências
npm install

#Em caso de haver alguma vunerabilidade, basta aplicar esse codigo para resolve-los
npm audit fix
```

3️⃣ Rodar a aplicação:

```Bash
#Para iniciar a aplicação
npm run dev
```


O frontend estará disponível em: ```http://localhost:5173/```

##

## 🔌 Backend (UniPost_Api)
Este repositório é **apenas o frontend**. O backend é um repositório separado.

Todas as instruções para configurar e rodar o backend (API) estão em seu próprio repositório:

➡️ Repositório do Backend: [https://github.com/Kaique-Lemos/UniPost-API](https://github.com/Kaique-Lemos/UniPost-API.git)
##

## 🎨 Layout Responsivo

O layout foi totalmente construído com **Tailwind CSS**, garantindo uma interface moderna e responsiva (mobile-first) que se adapta a todos os tamanhos de tela, de celulares a desktops, sem a necessidade de arquivos CSS customizados.

##

## 🌐 Arquitetura do Sistema
```text
[Usuário] 
    |
    v
[Frontend React] <--Axios--> [API Django REST] <--SQLite--> [Banco de Dados]
```

- O React envia requisições HTTP (GET, POST, PUT, DELETE) para a API Django.
- A API Django processa os dados, aplica regras de negócio e persiste informações no SQLite.
- As respostas da API são exibidas pelo frontend para o usuário.

## 🧾 Histórias de Usuário

- **Cadastrar Aluno** – Como usuário, quero adicionar um novo aluno com nome, curso e matrícula.
- **Listar Alunos** – Como usuário, quero visualizar todos os alunos cadastrados.
- **Editar Aluno** – Como usuário, quero alterar os dados de um aluno existente.
- **Excluir Aluno** – Como usuário, quero remover um aluno cadastrado.

## 👨‍💻 Desenvolvido por

- **Crystian da Paz Silva**  
- **Bruno Nogueira da Rocha**  
- **Kaique Lemos da Silva**  
- **Pedro Vinícius de Arruda Barbosa**
- **Matheus Felipe Vilas Boas de Araujo Silva**
- **Gustavo Teixeira Bione**
- **Thiago de Lima Freire**
- **Lucas Ferraz Valença Parente**
  
💼 Projeto de aplicação web (Django + React)  
📚 Persistência de dados com SQLite  
🗓️ 2025  
