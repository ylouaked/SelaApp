import { expect } from '@playwright/test'; 
import { bénéficiaire, loginData } from '../helpers/datas.js';
import { otp } from '../helpers/otp.js';


export async function addBeneficiaire(page, data, OTP) {
    
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await page.getByRole('button', { name: 'Ajouter un bénéficiaire' }).click();
    await expect(page.getByRole('heading')).toContainText('Ajouter un bénéficiaire');
    await expect(page.getByLabel('Nom et prénom')).toBeVisible();
    await expect(page.getByLabel('RIB')).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeEnabled();
    await page.getByLabel('Nom et prénom').click();
    await page.getByLabel('Nom et prénom').fill(data.NomPrénom);
    await page.getByLabel('RIB').click();
    await page.getByLabel('RIB').fill(data.RIB);

    if (data === bénéficiaire.invalid_rib) {
        await page.getByLabel('Nom et prénom').click();
        await expect(page.getByRole('button', { name: 'Ajouter' })).toBeDisabled();
        const errorMessage = page.locator('#mat-error-0'); 
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Le RIB est invalide');
        return;
        
    }

  
    await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
    await page.getByRole('button', { name: 'Ajouter' }).click();
 
    await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');

   for (const number of loginData.valid_data.password) {
        await page.locator(`button:has-text("${number}")`).click();
     }

    await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
    await page.getByRole('button', { name: 'Confirmer' }).click();
    
    await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0551****32');
    await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Vous n\'avez pas reçu le code?');
    await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Renvoyer le code');
    await otp(page, OTP);
    await page.getByRole('button', { name: 'Valider' }).click();
   
    if (data === bénéficiaire.existe_deja) {
       
        await expect(page.locator('#mat-dialog-3')).toContainText('Erreur Le bénéficiaire existe déjà');
        await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeEnabled();
        await page.getByRole('button', { name: 'OK, Merci' }).click();
        await browser.close();
         
   


    } else if (data === bénéficiaire.nouveau_benef) {
        await expect(page.locator('#mat-dialog-3')).toContainText('Bénéficiaire ajouté avec succès');
        await page.getByRole('button', { name: 'OK, Merci' }).click();
        await expect(page.getByRole('row', { name: `${data.NomPrénom}` })).toBeVisible();
        await browser.close();
    } 
    
   
}