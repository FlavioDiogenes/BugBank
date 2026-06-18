const{test, expect} = require('@playwright/test')

const BASE_URL = 'https://bugbank.netlify.app/';
//npx playwright codegen https://bugbank.netlify.app/

test.describe('Cadastro - BugBank', () => {
    test('BBQA-6 - Cadastro com dados válidos', async ({ page }) => {
        await page.goto(BASE_URL);

        await page.getByRole('button', {name: 'Registrar'}).click();
        
        const cadastro = page.locator('.card__register');

        const email = 'teste' + Date.now() + '@gmail.com';
        const senha = 'Teste123';

        await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
        await cadastro.getByPlaceholder('Informe seu Nome').fill('Usuário Teste');
        await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);

        await cadastro.getByRole('button', {name: 'Cadastrar'}).click();

        await expect(page.getByText(/criada com sucesso/i)).toBeVisible();
        await page.getByText('Fechar').click();
    });

    test('BBQA-7 - Cadastro com email inválido', async ({page}) => {
        await page.goto(BASE_URL);

        await page.getByRole('button', {name: 'Registrar'}).click();
        
        const cadastro = page.locator('.card__register');

        const senha = 'Teste123';

        await cadastro.getByPlaceholder('Informe seu e-mail').fill('emailinvalido');
        await cadastro.getByPlaceholder('Informe seu Nome').fill('Usuário Teste');
        await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);

        await cadastro.getByRole('button', {name: 'Cadastrar'}).click();

        await expect(cadastro.getByText(/Formato inválido/i)).toBeVisible();
        await expect(page.getByText(/criada com sucesso/i)).not.toBeVisible();

    });
    test('BBQA-8 -Cadastro com senha fraca', async ({page}) =>{
        await page.goto(BASE_URL);

        await page.getByRole('button', { name: 'Registrar' }).click();

        const cadastro = page.locator('.card__register');

        const email = 'teste' + Date.now() + '@gmail.com';
        const senhaFraca = 'senha123';

        await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
        await cadastro.getByPlaceholder('Informe seu Nome').fill('Usuário Teste');
        await cadastro.getByPlaceholder('Informe sua senha').fill(senhaFraca);
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senhaFraca);

        await cadastro.getByRole('button', { name: 'Cadastrar' }).click();

        await expect(page.getByText(/criada com sucesso/i)).not.toBeVisible();
        await expect(page.getByText(/senha fraca|senha é fraca|senha inválida/i)).toBeVisible();

    });
    test('BBQA-9 - Cadastro com campos vazios', async ({page}) =>{
        await page.goto(BASE_URL);

        await page.getByRole('button', { name: 'Registrar' }).click();
        
        const cadastro = page.locator('.card__register');

        await cadastro.getByPlaceholder('Informe seu e-mail').fill(' ');
        await cadastro.getByPlaceholder('Informe seu Nome').fill(' ');
        await cadastro.getByPlaceholder('Informe sua senha').fill(' ');
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(' ');

        await expect(cadastro.getByText(/É campo obrigatório/)).toHaveCount(4);
        await expect(page.getByText(/criada com sucesso/i)).not.toBeVisible();

    });
    test('BBQA-10 - Cadastro com usuário já existente', async ({page}) => {
        await page.goto(BASE_URL);

        await page.getByRole('button', { name: 'Registrar' }).click();
        
        const cadastro = page.locator('.card__register');

        const email = 'teste' + Date.now() + '@gmail.com';
        const senha = 'Teste123';
        const usuario = 'Usuário Teste';

        await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
        await cadastro.getByPlaceholder('Informe seu Nome').fill(usuario);
        await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);
        
        await cadastro.getByRole('button', {name: 'Cadastrar'}).click();

        await expect(page.getByText(/criada com sucesso/i)).toBeVisible();
        await page.getByText('Fechar').click();


        await page.getByRole('button', { name: 'Registrar' }).click();

        await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
        await cadastro.getByPlaceholder('Informe seu Nome').fill(usuario);
        await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
        await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);

        await cadastro.getByRole('button', {name: 'Cadastrar'}).click();

        await expect(page.getByText(/usuário já existente|usuário já cadastrado|email já existe|e-mail já cadastrado|email já foi cadastrado/i)).toBeVisible();
        await expect(page.getByText(/criada com sucesso/i)).not.toBeVisible();
    });
});