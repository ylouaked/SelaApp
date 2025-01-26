import { test,expect } from '@playwright/test'; 
import { login } from './helpers/login.js';
import { loginData } from './datas.js';

test.use({
    ignoreHTTPSErrors: true, 
});

test.beforeEach(async ({ page }) => {
    await login(page, loginData.valid_data);
});

test('Déconnexion', async ({ page }) => {
   
    await page.getByRole('button', { name: 'Matt Hudson' }).click();
    // await expect(page.locator('#mat-menu-panel-3')).toContainText('Changer votre code secret');
    // await expect(page.locator('#mat-menu-panel-3')).toContainText('Déconnexion');
    await page.getByRole('menuitem', { name: 'Déconnexion' }).click();
   // await expect(page).toHaveURL('https://10.234.34.115/index/login');
    await expect(page.locator('app-login')).toContainText('S’identifier à votre compte');
    //  await expect(page).toHaveTitle(/'S’identifier/); ca n'a pas marcher
    
   });