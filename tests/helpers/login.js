import { expect } from '@playwright/test';
import { loginData } from './datas.js'; 


export async function login(page, { username, password }) {
  await page.goto('https://10.234.34.115/index/login');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByRole('menuitem', { name: 'FR' }).click();
  await page.getByPlaceholder('Identifiant').fill(username);
  await page.getByRole('button', { name: 'Valider' }).click();
  for (const number of password.split('')) {
    await page.locator(`button:has-text("${number}")`).click();
  }
  await page.getByRole('button', { name: 'Je me connecte' }).click();
  await expect(page).toHaveTitle(/Mes comptes/);
}

export async function loginWithCase(page, data) {
  await page.goto('https://10.234.34.115/index/login');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByRole('menuitem', { name: 'FR' }).click();
  await page.getByPlaceholder('Identifiant').click();

  switch (data) {
    case loginData.empty_user:
      await page.getByRole('button', { name: 'Valider' }).click();
      const emptyError = page.locator('#mat-error-0');
      await expect(emptyError).toBeVisible();
      await expect(emptyError).toHaveText('Identifiant requis');
      break;

    case loginData.short_psw:
      await page.getByPlaceholder('Identifiant').fill(data.username);
      await page.getByRole('button', { name: 'Valider' }).click();

      for (const number of data.password.split('')) {
        await page.locator(`button:has-text("${number}")`).click();
      }

      await expect(page.getByRole('button', { name: 'Je me connecte' })).toBeDisabled();
      break;

    case loginData.invalid_user:
    case loginData.invalid_psw:
    case loginData.invalid_data:
      await page.getByPlaceholder('Identifiant').fill(data.username);
      await page.getByRole('button', { name: 'Valider' }).click();

      for (const number of data.password.split('')) {
        await page.locator(`button:has-text("${number}")`).click();
      }

      await page.getByRole('button', { name: 'Je me connecte' }).click();

      const loginError = page.locator('.login-error');
      await expect(loginError).toBeVisible();
      await expect(loginError).toHaveText('Identifiant ou code secret incorrect');
      break;

      default:
        break;
      }
    }