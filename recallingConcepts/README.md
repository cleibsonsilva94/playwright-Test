# 📘 README - Playwright (Guia Rápido)

## ✅ Pré-requisitos
- Node.js >= 16
- npm ou yarn

---

## 🚀 Instalação

Comandos:

    npm init -y
    npm install -D @playwright/test
    npx playwright install

---

## 📂 Estrutura padrão de pastas

    .
    ├── tests/
    │   └── example.spec.ts
    ├── playwright.config.ts
    └── package.json

---

## ▶️ Executar testes

Rodar todos os testes:

    npx playwright test

Rodar um arquivo específico:

    npx playwright test tests/example.spec.ts

Rodar múltiplos arquivos:

    npx playwright test tests/

Rodar um teste específico (por nome):

    npx playwright test -g "nome do teste"

---

## 🧪 Exemplo de teste

    import { test, expect } from '@playwright/test';

    test('deve carregar a página inicial', async ({ page }) => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle(/Example/);
    });

---

## 🎯 Executar vários testes de um arquivo

Todos os testes do arquivo são executados automaticamente:

    npx playwright test tests/example.spec.ts

---

## 🎯 Filtrar testes

Por nome (grep):

    npx playwright test -g "login"

Executar apenas um teste:

    test.only('teste específico', async ({ page }) => {});

Ignorar teste:

    test.skip('teste ignorado', async ({ page }) => {});

---

## 🧰 Interface Gráfica (UI Mode)

    npx playwright test --ui

Permite:
- Executar testes manualmente
- Ver logs e passos

---

## 🔍 Debug e execução visual

Abrir browser:

    npx playwright test --headed

Debug completo:

    npx playwright test --debug

---

## 📸 Relatório

    npx playwright show-report

---

## 📌 Comandos principais

    npx playwright test
    npx playwright test arquivo.spec.ts
    npx playwright test -g "nome"
    npx playwright test --ui
    npx playwright test --debug
    npx playwright test --headed
    npx playwright show-report