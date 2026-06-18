# Testes Automatizados - BugBank

Este repositório contém testes automatizados da aplicação BugBank utilizando Playwright.

Os testes foram criados com base nos casos de teste elaborados no Qase, cobrindo funcionalidades de Login e Cadastro.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Playwright

## Aplicação testada

BugBank: https://bugbank.netlify.app/

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm

## Como instalar o projeto

Após clonar o repositório, execute o comando abaixo para instalar as dependências:

```bash
npm install
```

```bash
npx playwright install
```

## Como executar os testes

Para executar todos os testes automatizados:

```bash
npx playwright test
```

Para executar os testes com o navegador aberto:

```bash
npx playwright test --headed
```

Para executar um arquivo específico de teste:

```bash
npx playwright test tests/Login.spec.js
```

ou:

```bash
npx playwright test tests/Cadastro.spec.js
```

## Como visualizar o relatório dos testes

Após a execução dos testes, utilize:

```bash
npx playwright show-report
```

## Estrutura do projeto

```bash
PlayWrightAutomation/
├── tests/
│   ├── Login.spec.js
│   └── Cadastro.spec.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── README.md
└── .gitignore
```

## Casos automatizados

### Login

- BBQA-1 - Login com dados válidos
- BBQA-2 - Login com e-mail inválido
- BBQA-3 - Login com senha incorreta
- BBQA-4 - Login com campos vazios
- BBQA-5 - Login com espaços em branco

### Cadastro

- BBQA-6 - Cadastro com dados válidos
- Demais casos de cadastro conforme plano de testes no Qase

## Observações

- Os testes utilizam dados dinâmicos para criação de usuários, evitando conflito com e-mails já cadastrados.
