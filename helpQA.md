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

---

# 🔷 👁️ EXECUÇÃO VISUAL (Cucumber + Playwright)

Configuração no arquivo `hooks.ts`:

```ts
this.browser = await chromium.launch({
  headless: false,
  slowMo: 500
});

# ⚙️ SETUP

▶ Criar projeto
npm init playwright@latest

▶ Instalar browsers
npx playwright install

▶ Instalar apenas Chromium
npx playwright install chromium

▶ Gerar código automático
npx playwright codegen

---

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