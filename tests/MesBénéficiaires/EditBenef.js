import { expect} from '@playwright/test'; 
import { loginData } from '../helpers/datas.js';

export async function EditBenef(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
 
     await page.getByRole('row', { name: `${data.NomPrénom} ${data.RIB}`  }).getByLabel('Example icon-button with a menu').click(); 
     await page.getByRole('menuitem', { name: 'Modifier' }).click();
     await expect(page.locator('#mat-dialog-0')).toBeVisible();
     await expect(page.locator('#mat-dialog-0')).toContainText('Modifier un bénéficiaire');
     await page.getByRole('textbox', { name: 'Nom et prénom' }).fill(data.newName);
     await expect(page.getByRole('button', { name: 'Modifier' })).toBeEnabled()
     await page.getByRole('button', { name: 'Modifier' }).click();
     await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');
    
    for (const number of loginData.valid_data.password) {
         await page.locator(`button:has-text("${number}")`).click();
      }
 
     await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
     await page.getByRole('button', { name: 'Confirmer' }).click();
     await expect(page.locator('#mat-dialog-2')).toContainText('Modification de bénéficiaire Le bénéficiaire a été modifié avec succès');
     await page.getByRole('button', { name: 'OK, Merci' }).click();
     await expect(page.getByRole('row', { name: `${data.newName}` })).toBeVisible();
     await browser.close();

}