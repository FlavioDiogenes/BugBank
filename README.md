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

Após clonar o repositório, execute os comandos abaixo para instalar as dependências do projeto e os navegadores utilizados pelo Playwright:

```bash
npm install
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
## Extensão opcional no VS Code

Também é possível utilizar a extensão oficial do Playwright no VS Code para facilitar a execução e depuração dos testes.

### Como instalar

1. Abra o VS Code
2. Acesse a aba de extensões
3. Pesquise por:

```txt
Playwright Test for VSCode
```

4. Instale a extensão oficial da Microsoft.

A extensão é opcional. Os testes também podem ser executados normalmente pelo terminal.

## Como visualizar o relatório dos testes

Após a execução dos testes, utilize:

```bash
npx playwright show-report
```

## Estrutura do projeto

```bash
bugbank-test-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   └── plano-de-teste-e-relatorio-de-bugs.pdf
├── tests/
│   ├── Cadastro.spec.js
│   └── Login.spec.js
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── playwright.config.js
```

## Documentação

O plano de teste e relatório de bugs utilizado como base para os testes automatizados está disponível em:

[Plano de Teste e Relatório de Bugs](docs/plano-de-teste-e-relatorio-de-bugs.pdf)


## Casos automatizados

### Login

- CT.01 - Login com dados válidos
- CT.02 - Login com e-mail inválido
- CT.03 - Login com senha incorreta
- CT.04 - Login com campos vazios
- CT.05 - Login com espaços em branco

### Cadastro

- CT.06 - Cadastro com dados válidos
- CT.07 - Cadastro com e-mail inválido
- CT.08 - Cadastro com senha fraca
- CT.09 - Cadastro com campos vazios
- CT.10 - Cadastro com usuário já existente

## Observações

- Alguns testes automatizados podem falhar porque a aplicação BugBank apresenta comportamentos divergentes dos resultados esperados definidos no plano de teste. Essas falhas estão documentadas no relatório de bugs disponível na pasta `docs`.
- Os testes utilizam dados dinâmicos para criação de usuários, evitando conflito com e-mails já cadastrados.
- As pastas `node_modules`, `playwright-report` e `test-results` não devem ser versionadas, pois são geradas automaticamente.
