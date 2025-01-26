import { expect } from '@playwright/test';
import { loginData } from '../datas.js'; 


export async function login(page, data) {
    await page.goto('https://10.234.34.115/index/login');
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('menuitem', { name: 'FR' }).click();
    await page.getByPlaceholder('Identifiant').click();
     if (data === loginData.empty_user) {
       await page.getByRole('button', { name: 'Valider' }).click();
       const errorMessage = page.locator('#mat-error-0'); 
       await expect(errorMessage).toBeVisible();
       await expect(errorMessage).toHaveText('Identifiant requis');
       return;
       }

    await page.getByPlaceholder('Identifiant').fill(data.username);
    await page.getByRole('button', { name: 'Valider' }).click();

    for (const number of data.password) {
    await page.locator(`button:has-text("${number}")`).click();
    }

  if (data === loginData.short_psw) {
  await expect(page.getByRole('button', { name: 'Je me connecte' })).toBeDisabled();
  }

  if (data === loginData.valid_data) {
    await page.getByRole('button', { name: 'Je me connecte' }).click();
    await expect(page).toHaveTitle(/Mes comptes/);
    // await expect(page).toHaveURL('https://10.234.34.115/mes-comptes');
  } 
 
  if(data ===loginData.invalid_data  || data === loginData.invalid_user || data === loginData.invalid_psw)
   {
    await page.getByRole('button', { name: 'Je me connecte' }).click();
      const errorMessage = page.locator('.login-error'); 
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('Identifiant ou code secret incorrect');
  }
 
 
}
