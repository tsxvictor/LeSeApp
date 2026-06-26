<div align="center">

<img src="assets/images/icon.png" width="120" alt="Lê-Se Logo" />

# 📚 Lê-Se

*Descubra sua próxima história.*

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## ✨ Sobre o Projeto

O **Lê-Se** é um aplicativo mobile de biblioteca pessoal desenvolvido com **React Native + Expo**. Ele permite ao usuário explorar livros clássicos por categoria, acompanhar sua leitura atual, descobrir autores em destaque e gerenciar seu perfil de leitor.

Projeto desenvolvido como portfólio acadêmico no curso de **Análise e Desenvolvimento de Sistemas — UNISUAM**.

---

## 📱 Telas

| Home | Explorar | Perfil |
|------|----------|--------|
| Categorias de livros, card de leitura atual e citação do dia | Busca por livros e autores, coleções em destaque | Favoritos, já lidos e progresso de leitura |

---

## 🚀 Funcionalidades

- 📖 Biblioteca com livros organizados por categoria (Ficção Científica, Romance, Mistério, Fantasia)
- 🔍 Busca por título e autor em tempo real
- 🌙 Modo claro / escuro
- 👤 Autenticação com login e logout
- 📊 Progresso de leitura com barra visual
- 🗂️ Coleções temáticas
- ⭐ Lista de favoritos e livros já lidos

---

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) + [Expo Router](https://expo.github.io/router/)
- [TypeScript](https://www.typescriptlang.org/)
- React Context API (tema e autenticação)

---

## ⚙️ Como rodar

```bash
# Clone o repositório
git clone https://github.com/tsxvictor/LeSeApp.git

# Acesse a pasta
cd LeSeApp

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

Escaneie o QR Code com o **Expo Go** no celular ou acesse pelo navegador.

---

## 📁 Estrutura de Pastas

```
LeSeApp/
├── app/
│   ├── _layout.tsx        # Layout raiz com autenticação
│   ├── (tabs)/
│   │   ├── index.tsx      # Tela Home
│   │   ├── explore.tsx    # Tela Explorar
│   │   └── perfil.tsx     # Tela Perfil
│   └── auth/
│       └── login.tsx      # Tela de Login
├── assets/
│   └── images/            # Capas dos livros e ícones
├── AuthContext.tsx         # Contexto de autenticação
└── ThemeContext.tsx        # Contexto de tema claro/escuro
```

---

## 👨‍💻 Autor

Desenvolvido por **Victor Gabriel Correia do Nascimento**

[![GitHub](https://img.shields.io/badge/GitHub-tsxvictor-181717?style=for-the-badge&logo=github)](https://github.com/tsxvictor)

---

<div align="center">
  <sub>Feito com 📚 e muito café ☕</sub>
</div>
