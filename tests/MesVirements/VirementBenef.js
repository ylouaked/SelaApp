import { expect } from '@playwright/test'; 
import { loginData } from '../helpers/datas.js';

export async function VirementSimple(page,data){
 await page.getByRole('button', { name: 'Mes virements' }).click();
 await page.getByRole('link', { name: 'Effectuer un virement vers bénéficiaire' }).click();
 await expect (page).toHaveTitle(/Effectuer un virement vers bénéficiaire/)
 await page.getByRole('button', { name: 'Sélectionner un compte' }).click();
 await expect(page.locator('#mat-dialog-0')).toContainText('Sélectionner un compte')
 await expect(page.getByRole('button')).toContainText('Annuler');
 await page.getByText('COMPTE COURANT ').click();
 await page.getByRole('button', { name: 'Sélectionner un bénéficiaire' }).click();
 await page.getByText(`${data.NomPrénom}` ).click();
 await page.getByRole('button', { name: 'Continuer' }).click();
 await page.getByRole('textbox', { name: '0,00' }).fill('1000');
 await page.getByRole('textbox', { name: 'Motif…' }).fill('Test Auto');
 await page.getByRole('button', { name: 'Continuer' }).click();
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Compte à débiter COMPTE COURANT 1130000001');
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Montant 1 000,00 DZD')
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Motif du virement Test Auto');
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Date d’exécution Aujourd’hui');
 await page.getByRole('button', { name: 'Valider le virement' }).click();
 await expect(page.locator('#mat-dialog-2')).toContainText('Confirmation du virement  Saisissez votre code secret ');
 for (const number of loginData.valid_data.password) {
      await page.locator(`button:has-text("${number}")`).click();
   }
await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
await page.getByRole('button', { name: 'Confirmer' }).click();
await expect(page.locator('#mat-dialog-3')).toContainText('Succès Opération effectuée avec succès');
}


export async function VirementMensuel(page,data){
    await page.getByRole('button', { name: 'Mes virements' }).click();
    await page.getByRole('link', { name: 'Effectuer un virement vers bénéficiaire' }).click();
    await expect (page).toHaveTitle(/Effectuer un virement vers bénéficiaire/)
    await page.getByRole('button', { name: 'Sélectionner un compte' }).click();
    await expect(page.locator('#mat-dialog-0')).toContainText('Sélectionner un compte')
    await expect(page.getByRole('button')).toContainText('Annuler');
    await page.getByText('COMPTE COURANT ').click();
    await page.getByRole('button', { name: 'Sélectionner un bénéficiaire' }).click();
    await page.getByText(`${data.NomPrénom}` ).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await page.getByRole('textbox', { name: '0,00' }).fill('2000');
    await page.getByRole('textbox', { name: 'Motif…' }).fill('Virement Mensuel');
    await page.getByRole('button', { name: 'Continuer' }).click();
    await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Compte à débiter COMPTE COURANT 1130000001');
    await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Montant 1 000,00 DZD')
    await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Motif du virement Test Auto');
    await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Date d’exécution Aujourd’hui');
    await page.getByRole('button', { name: 'Valider le virement' }).click();
    await expect(page.locator('#mat-dialog-2')).toContainText('Confirmation du virement  Saisissez votre code secret ');
    for (const number of loginData.valid_data.password) {
         await page.locator(`button:has-text("${number}")`).click();
      }
   await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
   await page.getByRole('button', { name: 'Confirmer' }).click();
   await expect(page.locator('#mat-dialog-3')).toContainText('Succès Opération effectuée avec succès');
   
  
   }
   
