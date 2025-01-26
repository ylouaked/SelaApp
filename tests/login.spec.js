import { test } from '@playwright/test'; 
import { login } from './helpers/login.js';
import { loginData } from './datas.js';

test.use({
    ignoreHTTPSErrors: true, 
});

// test('Login avec des informations valides', async ({ page }) => {
//   await page.goto('https://10.234.34.115/index/login');
//   await page.getByPlaceholder('Username').click();
//   await page.getByPlaceholder('Username').fill('100000');
//   await page.getByRole('button', { name: 'Submit' }).click();
//   for (let i = 0; i < 3; i++) {
//     await page.getByRole('button', { name: '1' }).click();
//     await page.getByRole('button', { name: '2' }).click();
//   }
//   await page.getByRole('button', { name: 'Log in' }).click();
//   await expect(page).toHaveURL('https://10.234.34.115/mes-comptes');
// });


test('Login avec des informations valides', async ({ page }) => {
 await login(page, loginData.valid_data);
});



test('Login avec un username invalide', async ({ page }) => {
  await login(page, loginData.invalid_user);
});

test('Login avec un mot de passe invalide', async ({ page }) => {
  await login(page, loginData.invalid_psw);
});

test('Login avec un username et un mot de passe invalides', async ({ page }) => {
  await login(page, loginData.invalid_data);
})

test('Login avec un mot de passe court', async ({ page }) => {
  await login(page, loginData.short_psw);
})

test('Login avec champ vide' , async ({ page }) => {
  await login(page, loginData.empty_user);
        })



// test('Le champ Username devient rouge après le focus', async ({ page }) => {
//   await page.goto('https://10.234.34.115/index/login');
//   const usernameInput = page.locator('input[placeholder="Username"]');
//   await usernameInput.click();
//   const borderColor = await usernameInput.evaluate(el => 
//     window.getComputedStyle(el.closest('.mat-form-field')).borderColor
//   );
//   expect(borderColor).toBe('rgb (255 , 0, 0)');  
// });


