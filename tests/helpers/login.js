import { expect } from '@playwright/test';
import { enterPassword, loginData } from './datas.js'; 


// export async function login(page, { username}) {
//   await page.goto('https://10.234.34.115/index/login');
//   await page.getByRole('button', { name: 'EN' }).click();
//   await page.getByRole('menuitem', { name: 'FR' }).click();
//   await page.getByPlaceholder('Identifiant').fill(username);
//   await page.getByRole('button', { name: 'Valider' }).click();
//   await enterPassword(page, loginData.valid_data.password);
//   await page.getByRole('button', { name: 'Je me connecte' }).click();
//   await expect(page).toHaveTitle(/Mes comptes/);
// }

export async function login(page, data) {
  await page.goto('https://10.234.34.115/index/login');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByRole('menuitem', { name: 'FR' }).click();
  await page.getByPlaceholder('Identifiant').click();

  switch (data) {
    case loginData.valid_data:
      await page.getByPlaceholder('Identifiant').fill(data.username);
      await page.getByRole('button', { name: 'Valider' }).click();
      await enterPassword(page, loginData.valid_data.password);
      await page.getByRole('button', { name: 'Je me connecte' }).click();
      await expect(page).toHaveTitle(/Mes comptes/);
    break;
      
    case loginData.empty_user:
      await page.getByRole('button', { name: 'Valider' }).click();
      const emptyError = page.locator('#mat-error-0');
      await expect(emptyError).toBeVisible();
      await expect(emptyError).toHaveText('Identifiant requis');
      break;

    case loginData.short_psw:
      await page.getByPlaceholder('Identifiant').fill(data.username);
      await page.getByRole('button', { name: 'Valider' }).click();

      await enterPassword(page, data.password);

      await expect(page.getByRole('button', { name: 'Je me connecte' })).toBeDisabled();
      break;

    case loginData.invalid_user:
    case loginData.invalid_psw:
    case loginData.invalid_data:
      await page.getByPlaceholder('Identifiant').fill(data.username);
      await page.getByRole('button', { name: 'Valider' }).click();

      await enterPassword(page, data.password);

      await page.getByRole('button', { name: 'Je me connecte' }).click();

      const loginError = page.locator('.login-error');
      await expect(loginError).toBeVisible();
      await expect(loginError).toHaveText('Identifiant ou code secret incorrect');
      break;

      default:
        break;
      }
    }