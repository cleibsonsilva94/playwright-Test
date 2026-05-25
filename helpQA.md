# 🎯 Playwright - Guia Rápido de Seletores + Execução

> Objetivo: usar seletores estáveis, legíveis e resistentes a mudanças.

---
# ✅ ESTRUTURA DE TESTE PADRÃO

test('', async ({ page }) => {
});

# ✅ ▶️ COMANDOS PARA RODAR TESTES

---

# 🔷 🚀 PLAYWRIGHT (Testes técnicos)

### ▶ Executar todos os testes
npx playwright test

### ▶ Executar em modo UI
npx playwright test --ui

### ▶ Executar teste específico (arquivo)
npx playwright test tests/login.spec.ts

### ▶ Executar por nome
npx playwright test -g "nome do teste"

### ▶ Navegador específico
npx playwright test --project=chromium  
npx playwright test --project=firefox  
npx playwright test --project=webkit  

### ▶ Modo debug
npx playwright test --debug

### ▶ Headed (visual)
npx playwright test --headed

### ▶ Reexecutar falhas
npx playwright test --last-failed

### ▶ Ativar trace
npx playwright test --trace on

### ▶ Abrir trace
npx playwright show-trace trace.zip

### ▶ Relatório HTML
npx playwright show-report

### ▶ Paralelismo
npx playwright test --workers=4

### ▶ Execução serial
npx playwright test --workers=1

### ▶ Atualizar snapshots
npx playwright test --update-snapshots

### ▶ Rodar testes marcados
npx playwright test -g @smoke

### ▶ Debug alternativo
PWDEBUG=1 npx playwright test

---

# 🔷 🧪 CUCUMBER (BDD)

### ▶ Executar todos os cenários
npx cucumber-js

### ▶ Executar feature específica
npx cucumber-js tests/features/login.feature

### ▶ Executar por TAG
npx cucumber-js --tags "@login-sucesso"

### ▶ Executar múltiplas TAGs
npx cucumber-js --tags "@smoke or @regression"

### ▶ Ignorar TAG
npx cucumber-js --tags "not @ignore"

### ▶ Executar por nome do cenário
npx cucumber-js --name "Login com sucesso"

### ▶ Gerar Relatórios 
npx allure generate allure-results --clean

### ▶ Abrir Relatórios 
npx allure open

---

# 🔷 👁️ EXECUÇÃO VISUAL (Cucumber + Playwright)

Configuração no arquivo `hooks.ts`:

```ts
this.browser = await chromium.launch({
  headless: false,
  slowMo: 500
});

# ⚙️ SETUP

# 🚀 EXECUÇÃO DE TESTES E RELATÓRIO (Cucumber + Allure)

# ▶ EXECUTAR TESTES COM RELATÓRIO + HISTÓRICO + DATA

## Rodar TODOS os testes
npm run run:all

---

## Rodar teste por NOME
npm run run:name --name="Login com sucesso"

---

## Rodar teste por TAG
npm run run:tag --tag="@login-sucesso"

---

## Rodar script fixo (exemplo)
npm run run:login


# ▶ O QUE OS COMANDOS FAZEM

Todos os comandos seguem o fluxo:

restoreHistory → executa testes → saveHistory → gera relatório com data → abre Allure

---

# ▶ RESULTADO DOS RELATÓRIOS

A cada execução será criada uma nova pasta:

allure-reports/
  report-2026-05-21T21-45-00
  report-2026-05-21T21-50-10
  report-2026-05-21T21-55-30

Cada pasta contém:
- relatório HTML
- screenshots
- dados da execução

---

# ▶ COMO VER O HISTÓRICO

1. Execute qualquer comando (ex: run:all)

2. O relatório será aberto automaticamente

3. Dentro do Allure:
Menu → Graphs → History

Você verá:
- execuções anteriores
- evolução dos testes
- quantidade de falhas vs sucesso

4. Ver relatório por data

- npx allure open allure-reports/caminho da pasta
- ex: npx allure open allure-reports/report-2026-05-25T20-49-06-758Z

---

# ▶ PASTAS IMPORTANTES

allure-results  → dados da execução atual  
allure-report   → relatório temporário (não relevante com timestamp)  
allure-reports  → relatórios versionados por data ✅  
evidences       → screenshots  
allure-history  → histórico entre execuções  

---

# ▶ RESUMO

Rodar todos → npm run run:all  
Por nome → npm run run:name  
Por tag → npm run run:tag  

Relatórios → gerados automaticamente  
Histórico → mantido automaticamente  
Execuções → salvas por data  

---

# ▶ OBSERVAÇÃO IMPORTANTE

- O Allure mantém histórico entre execuções
- Cada execução gera um novo relatório com timestamp
- Não há sobrescrita de relatórios antigos

# ✅ PRIORIDADE DE USO (Selector)

1. ✅ getByRole
await page.getByRole('button', { name: 'Salvar' });
await page.getByRole('textbox', { name: 'Email' });
await page.getByRole('link', { name: 'Home' });

2. ✅ getByTestId
await page.getByTestId('submit-button');

3. ✅ getByText
await page.getByText('Login');
await page.getByText('Erro', { exact: false });

4. ✅ CSS simples
await page.locator('#email');
await page.locator('.btn-primary');
await page.locator('input[type="email"]');

5. ✅ CSS combinado
await page.locator('form#login input[name="email"]');
await page.locator('.card .btn-primary');

6. ❌ Evitar
await page.locator('div > div:nth-child(2) > span');

---

# 🔎 TÉCNICAS

Texto + CSS
await page.locator('button:has-text("Salvar")');

Filho dentro de pai
await page.locator('.card').locator('button');

Filtro
await page.locator('.card', {
  has: page.locator('button:has-text("Comprar")')
});

---

# 📦 MULTIPLOS ELEMENTOS

const items = page.locator('.item');

const count = await items.count();

await items.nth(0);
await items.first();
await items.last();

for (let i = 0; i < await items.count(); i++) {
  console.log(await items.nth(i).textContent());
}

---

# 🧠 BOAS PRÁTICAS

✅ getByRole  
✅ data-testid  
✅ seletores simples  
✅ combinar quando necessário  

❌ nth-child  
❌ dependência de layout  
❌ seletores longos  