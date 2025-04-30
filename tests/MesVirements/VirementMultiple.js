import { expect } from '@playwright/test'; 
import { enterPassword, loginData } from '../helpers/datas.js';

export async function VirementMultipleDinars(page,data){
 await page.getByRole('button', { name: 'Mes virements' }).click();
 await page.getByRole('link', { name: 'Effectuer un virement multiple' }).click();
 await expect (page).toHaveTitle(/Effectuer un virement multiple/);
 await page.getByRole('button', { name: 'Sélectionner un compte' }).click();
 await expect(page.locator('#mat-dialog-0')).toContainText('Sélectionner un compte')
 await expect(page.getByRole('button')).toContainText('Annuler');
 await page.getByText(`${data.compteADebiter}` ).click();
 await page.getByRole('textbox', { name: 'Motif…' }).fill(data.motif);
 await page.getByRole('button', { name: 'Ajouter un ou plusieurs bénéficiaires' }).click();

 for (const item of data.beneficiaires) {
    await page.getByText(item.beneficiaire.RIB).click();
  }
  await page.getByRole('button', { name: 'Continuer' }).click();

   for (const item of data.beneficiaires) {
     await page.getByRole('button', { name: item.beneficiaire.NomPrénom }).getByPlaceholder('0,00').fill(item.montant);
   }

  //  Montant total :

  
 await page.getByRole('button', { name: 'Continuer' }).click();
 for (const item of data.beneficiaires) {
  await expect(page.locator('.row-description')).toContainText(item.beneficiaire.NomPrénom);
}
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Motif du virement ${data.motif}`);
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Date d’exécution Aujourd’hui');
 await page.getByRole('button', { name: 'Valider le virement' }).click();
// await expect(page.locator('#mat-dialog-2')).toContainText('Confirmation du virement  Saisissez votre code secret ');
// await enterPassword(page, loginData.valid_data.password);
// await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
//  await expect(page.locator('#mat-dialog-3')).toContainText('Succès Opération effectuée avec succès');
}