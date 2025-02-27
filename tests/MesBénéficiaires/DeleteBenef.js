import { expect } from "@playwright/test";
import { loginData } from "../helpers/datas";


export async function deleteBenef(page,data){
//acces la page benef
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/)
    await page.getByRole('row', { name: `${data.NomPrénom}` }).getByLabel('Example icon-button with a menu').click(); 
    await page.getByRole('menuitem', { name: 'Supprimer' }).click();
    await expect (page.locator('mat-dialog-container:has-text("Voulez-vous vraiment supprimer le bénéficiaire ?")')).toBeVisible();
    await expect (page.locator('#mat-dialog-0')).toContainText('Voulez-vous vraiment supprimer le bénéficiaire ?');
    await expect(page.locator('#mat-dialog-0')).toContainText('Supprimer le bénéficiaire ');
    await page.getByRole('button', { name: 'Oui, supprimer le bénéficiaire' }).click();
    //mot de passe
    await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');
       for (const number of loginData.valid_data.password) {
            await page.locator(`button:has-text("${number}")`).click();
         }
        await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
        await page.getByRole('button', { name: 'Confirmer' }).click();
        //pop up de réussite de suppression
        await expect(page.locator('#mat-dialog-2')).toContainText('Suppression de bénéficiaire ');
        try {
            await expect(page.locator('#mat-dialog-2')).toContainText('Le bénéficiaire a été supprimé avec succ. OK, Merci');
        } catch (error) {
            console.log("le msg ne corres pas", error)
        }
       
        await page.getByRole('button', { name: 'OK, Merci' }).click();
        await expect(page.locator('#mat-dialog-2')).toBeHidden();
        await page.reload();
        await expect(page.locator(`mat-row cdk-row ng-star-inserted:has-text("${data.NomPrénom}")`)).toHaveCount(0);
    
    } 



