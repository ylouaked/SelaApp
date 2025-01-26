import { test,expect } from '@playwright/test'; 
import { login } from './helpers/login.js';
import { bénéficiaire, loginData , OTP} from './datas.js';
import { otp } from './helpers/otp.js';

test.use({
    ignoreHTTPSErrors: true, 
});

test.beforeEach(async ({ page }) => {
    await login(page, loginData.valid_data);
});

test('Ajouter un bénéficiaire qui existe déja', async ({ page }) => {
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    // const addButton = page.locator('button:has-text("Ajouter un bénéficiaire")');
    // await expect(addButton).toBeVisible();
    // await addButton.click();
    await page.getByRole('button', { name: 'Ajouter un bénéficiaire' }).click();
    await expect(page.getByRole('heading')).toContainText('Ajouter un bénéficiaire');
    await expect(page.getByLabel('Nom et prénom')).toBeVisible();
    await expect(page.getByLabel('RIB')).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeEnabled();
    await page.getByLabel('Nom et prénom').click();
    await page.getByLabel('Nom et prénom').fill(bénéficiaire.existe_deja.NomPrénom);
    await page.getByLabel('RIB').click();
    await page.getByLabel('RIB').fill(bénéficiaire.existe_deja.RIB);
    await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
    await page.getByRole('button', { name: 'Ajouter' }).click();
    await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');
    await expect(page.getByRole('paragraph')).toContainText('Saisissez votre code secret');
    await expect(page.locator('#mat-dialog-1').getByRole('button', { name: 'Annuler' })).toBeVisible();
    await expect(page.locator('#mat-dialog-1').getByRole('button', { name: 'Annuler' })).toBeEnabled();

    for (const number of loginData.valid_data.password) {
        await page.locator(`button:has-text("${number}")`).click();
     }
     await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
     await page.getByRole('button', { name: 'Confirmer' }).click();
    
     await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0551****32');
    await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Vous n\'avez pas reçu le code?');
     await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Renvoyer le code');
     await otp(page,OTP)
    //  let i = 0;

    //  for (const otp of OTP) {
    //     const otpIndex = `#otp${i}`;
    //     await page.locator(otpIndex).fill(otp); 
    //    i++;
    //    console.log('otp',i)

    //     }
    // await page.locator('#otp0').fill('6');
    // await page.locator('#otp1').fill('6');
    // await page.locator('#otp2').fill('6');
    // await page.locator('#otp3').fill('0');
    // await page.locator('#otp4').fill('0');
    // await page.locator('#otp5').fill('0');
    // await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.locator('#mat-dialog-3')).toContainText('Erreur Le bénéficiaire existe déjà');
    await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeEnabled();
    await page.getByRole('button', { name: 'OK, Merci' }).click();
   });