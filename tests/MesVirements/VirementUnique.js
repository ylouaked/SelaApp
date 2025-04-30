import { expect } from '@playwright/test'; 
import { enterPassword, loginData } from '../helpers/datas.js';

export async function VirementSimpleDinars(page,data,Permanent){
 await page.getByRole('button', { name: 'Mes virements' }).click();
 await page.getByRole('link', { name: 'Effectuer un virement vers bénéficiaire' }).click();
 await expect (page).toHaveTitle(/Effectuer un virement vers bénéficiaire/);
 await page.getByRole('button', { name: 'Sélectionner un compte' }).click();
 await expect(page.locator('#mat-dialog-0')).toContainText('Sélectionner un compte')
 await expect(page.getByRole('button')).toContainText('Annuler');
 await page.getByText(`${data.compteADebiter}` ).click();
 await page.getByRole('button', { name: 'Sélectionner un bénéficiaire' }).click();
 await page.getByText(data.beneficiaire.RIB).click();

 await page.getByRole('button', { name: 'Continuer' }).click();
 await page.getByPlaceholder('0,00').fill(data.montant); // await page.getByRole('textbox', { name: '0,00' }).fill(data.montant);
 await page.getByRole('textbox', { name: 'Motif…' }).fill(data.motif);

 if (Permanent){
  await page.locator('.mat-slide-toggle-thumb-container').click();
  await expect(page.getByText('Date de début')).toBeVisible();
  await expect(page.getByText('Date de fin (Optionnel)')).toBeVisible();
  await page.locator('button:has-text("JJ/MM/AAAA")').nth(0).click();
  await expect(page.getByText('Choisir la date de début')).toBeVisible();
  await page.getByRole('gridcell', { name: data.periodeValide.dateDebut }).click();
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.locator('button:has-text("JJ/MM/AAAA")').nth(1).click();
  await page.locator('button[aria-label="Next month"]').click();
  await page.getByRole('gridcell', { name: data.periodeValide.dateFin }).click();
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Compte à débiter ${data.compteADebiter}`);
  const montantFormate = `${Number(data.montant).toLocaleString('fr-DZ', {
   minimumFractionDigits: 2,
   maximumFractionDigits: 2,
    })} DZD`;
  await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Montant ${montantFormate}`);
  await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Virement mensuel Oui');
  await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Motif du virement ${data.motif}`);
  await page.getByRole('button', { name: 'Valider le virement' }).click();
  await expect(page.locator('#mat-dialog-4')).toContainText('Confirmation du virement  Saisissez votre code secret ');
  await enterPassword(page, loginData.valid_data.password);
  await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
  await page.getByRole('button', { name: 'Confirmer' }).click();
 }


else{
 await page.getByRole('button', { name: 'Continuer' }).click();
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Compte à débiter ${data.compteADebiter}`);
 const montantFormate = `${Number(data.montant).toLocaleString('fr-DZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} DZD`;
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Montant ${montantFormate}`);
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Motif du virement ${data.motif}`);
 await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Date d’exécution Aujourd’hui');
 await page.getByRole('button', { name: 'Valider le virement' }).click();
 await expect(page.locator('#mat-dialog-2')).toContainText('Confirmation du virement  Saisissez votre code secret ');
 await enterPassword(page, loginData.valid_data.password);
 await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
 await page.getByRole('button', { name: 'Confirmer' }).click();
// await expect(page.locator('#mat-dialog-3')).toContainText('Succès Opération effectuée avec succès');
}
}


// export async function VirementDinarsMensuel(page,data){
//     await page.getByRole('button', { name: 'Mes virements' }).click();
//     await page.getByRole('link', { name: 'Effectuer un virement vers bénéficiaire' }).click();
//     await expect (page).toHaveTitle(/Effectuer un virement vers bénéficiaire/)
//     await page.getByRole('button', { name: 'Sélectionner un compte' }).click();
//     await expect(page.locator('#mat-dialog-0')).toContainText('Sélectionner un compte')
//     await expect(page.getByRole('button')).toContainText('Annuler');
//     await page.getByText(`${data.compteADebiter}` ).click();
//     await page.getByRole('button', { name: 'Sélectionner un bénéficiaire' }).click();
//     await page.getByText(data.beneficiaire.RIB).click();
//     await page.getByRole('button', { name: 'Continuer' }).click();
//     await page.getByPlaceholder('0,00').fill(data.montant);
//     await page.getByRole('textbox', { name: 'Motif…' }).fill(data.motif);
//     await page.locator('.mat-slide-toggle-thumb-container').click();
//     await expect(page.getByText('Date de début')).toBeVisible();
//     await expect(page.getByText('Date de fin (Optionnel)')).toBeVisible();
//     await page.locator('button:has-text("JJ/MM/AAAA")').nth(0).click();
//     await expect(page.getByText('Choisir la date de début')).toBeVisible();
//     await page.getByRole('gridcell', { name: data.periodeValide.dateDebut }).click();
//     await page.getByRole('button', { name: 'Valider' }).click();
//     await page.locator('button:has-text("JJ/MM/AAAA")').nth(1).click();
//     await page.locator('button[aria-label="Next month"]').click();
//     await page.getByRole('gridcell', { name: data.periodeValide.dateFin }).click();
//     await page.getByRole('button', { name: 'Valider' }).click();
//     await page.getByRole('button', { name: 'Continuer' }).click();
//     await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Compte à débiter ${data.compteADebiter}`);
//     const montantFormate = `${Number(data.montant).toLocaleString('fr-DZ', {
//      minimumFractionDigits: 2,
//      maximumFractionDigits: 2,
//       })} DZD`;
//     await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Montant ${montantFormate}`);
//     await expect(page.locator('app-details-virement-beneficiaire')).toContainText('Virement mensuel Oui');
//     await expect(page.locator('app-details-virement-beneficiaire')).toContainText(`Motif du virement ${data.motif}`);
//     await page.getByRole('button', { name: 'Valider le virement' }).click();
//     await expect(page.locator('#mat-dialog-4')).toContainText('Confirmation du virement  Saisissez votre code secret ');
//     await enterPassword(page, loginData.valid_data.password);
//     await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
//     await page.getByRole('button', { name: 'Confirmer' }).click();
//    // await expect(page.locator('#mat-dialog-3')).toContainText('Succès Opération effectuée avec succès');
  
//    }

   
   
