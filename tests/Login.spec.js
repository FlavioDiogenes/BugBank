const{test, expect} = require('@playwright/test')

const BASE_URL = 'https://bugbank.netlify.app/';
//npx playwright codegen https://bugbank.netlify.app/

test.describe('Login - BugBank', () => {

  test('BBQA-1 - Login com dados válidos', async ({ page }) => {
    const email = 'teste' + Date.now() + '@gmail.com';
    const senha = 'Teste123';
    // ${Date.now(})} "Cria numeros aleatórios", ou seja, um email diferente a cada teste rodado

    await page.goto(BASE_URL);

    // Primeiro cria uma conta válida
    await page.getByRole('button', {name: 'Registrar'}).click();

    const cadastro = page.locator('.card__register');

    await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
    await cadastro.getByPlaceholder('Informe seu Nome').fill('Usuário Teste');
    await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
    await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);

    await cadastro.getByRole('button', {name: 'Cadastrar'}).click();

    await expect(page.getByText(/criada com sucesso/i)).toBeVisible();

    await page.getByText('Fechar').click();

    // Depois faz login com a conta criada
    const login = page.locator('.card__login');

    await login.getByPlaceholder('Informe seu e-mail').fill(email);
    await login.getByPlaceholder('Informe sua senha').fill(senha);
    await page.getByRole('button', {name: 'Acessar'}).click();

    await expect(page).toHaveURL(/home/);
  });


  test('BBQA-2 - Login com email inválido', async ({ page }) => {
    await page.goto(BASE_URL);

    const login = page.locator('.card__login');


    await login.getByPlaceholder('Informe seu e-mail').fill('emailinvalido');
    await login.getByPlaceholder('Informe sua senha').fill('Teste123');
    await page.getByRole('button', {name: 'Acessar'}).click();

    await expect(page.getByText(/Formato inválido/i)).toBeVisible();
    await expect(page).not.toHaveURL(/home/);
  });

  test('BBQA-3 - Login com senha incorreta', async ({ page }) => {
    const email = 'teste' + Date.now() + '@gmail.com';
    const senha = 'Teste123';

    await page.goto(BASE_URL);

    // Primeiro cria uma conta válida
    await page.getByRole('button', {name: 'Registrar'}).click();

    const cadastro = page.locator('.card__register');

    await cadastro.getByPlaceholder('Informe seu e-mail').fill(email);
    await cadastro.getByPlaceholder('Informe seu Nome').fill('Usuário Teste');
    await cadastro.getByPlaceholder('Informe sua senha').fill(senha);
    await cadastro.getByPlaceholder('Informe a confirmação da senha').fill(senha);

    await page.getByRole('button', {name: 'Cadastrar'}).click();

    await expect(page.getByText(/foi criada com sucesso/i)).toBeVisible();

    await page.getByText('Fechar').click();

    //Depois insere uma senha incorreta
    const login = page.locator('.card__login');

    await login.getByPlaceholder('Informe seu e-mail').fill(email);
    await login.getByPlaceholder('Informe sua senha').fill('senhainvalida')
    await login.getByRole( 'button', {name: 'Acessar'}).click();

    await expect(page.getByText(/Usuário ou senha inválido/i)).toBeVisible();
    await expect(page).not.toHaveURL(/home/);
  });

  test('BBQA-4 - Login com campos vazios', async ({page})=>{
    await page.goto(BASE_URL);

    const login = page.locator('.card__login');

    await login.getByRole('button', { name: 'Acessar' }).click();

    await expect(login.getByText(/É campo obrigatório/)).toHaveCount(2);
    await expect(page).not.toHaveURL(/home/);

  });

  test('BBQA-5 - Login com espaços em branco', async ({page}) =>{
    await page.goto(BASE_URL);
    const login = page.locator('.card__login');

    await login.getByPlaceholder('Informe seu e-mail').fill(' ');
    await login.getByPlaceholder('Informe sua senha').fill(' ');

    await page.getByRole('button', {name: 'Acessar'}).click();

    await expect(login.getByText(/É campo obrigatório/)).toHaveCount(2);
    await expect(page).not.toHaveURL(/home/);

  });

});

