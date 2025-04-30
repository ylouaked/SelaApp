import { test,expect } from '@playwright/test'; 
import { login } from './helpers/login.js';
import { loginData } from './helpers/datas.js';

test.use({
    ignoreHTTPSErrors: true, 
});

test.beforeEach(async ({ page }) => {
    await login(page, loginData.valid_data);
});

test('Déconnexion', async ({ page }) => {
   
    await page.getByRole('button', { name: loginData.valid_data.Nom }).click();
    await page.getByRole('menuitem', { name: 'Déconnexion' }).click();
    await expect(page.locator('app-login')).toContainText('S’identifier à votre compte');
   
     
   });