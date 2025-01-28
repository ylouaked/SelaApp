import { expect } from "@playwright/test";
import { loginData } from "./datas";


export async function deleteBenef(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);


    await page.getByRole('row', { name: `${data.NomPrénom}` }).getByLabel('Example icon-button with a menu').click(); 
    await page.getByRole('menuitem', { name: 'Supprimer' }).click();
    await expect (page.locator('mat-dialog-container:has-text("Voulez-vous vraiment supprimer le bénéficiaire ?")')).toBeVisible();
    await expect (page.locator('#mat-dialog-0')).toContainText('Voulez-vous vraiment supprimer le bénéficiaire ?');
    await expect(page.locator('#mat-dialog-0')).toContainText('Supprimer le bénéficiaire ');
    await page.getByRole('button', { name: 'Oui, supprimer le bénéficiaire' }).click();

    await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');
    
    
       for (const number of loginData.valid_data.password) {
            await page.locator(`button:has-text("${number}")`).click();
         }
    
        await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
        await page.getByRole('button', { name: 'Confirmer' }).click();
        await expect(page.locator('#mat-dialog-2')).toContainText('Suppression de bénéficiaire ');
        await expect(page.locator('#mat-dialog-2')).toContainText('Le bénéficiaire a été supprimé avec succès. OK, Merci');
        await page.getByRole('button', { name: 'OK, Merci' }).click();
        await expect(page.locator('#mat-dialog-2')).toBeHidden();
        await page.reload();
        await expect(page.locator(`mat-row cdk-row ng-star-inserted:has-text("${data.NomPrénom}")`)).toHaveCount(0);
        
        
    

    //   await expect(page.locator('cell')).toMatchAriaSnapshot(`- cell "Y Yasmine LOUAKED"`);
    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // const beneficiary= await expect(page.getByRole('cell', { name:` Y ${data.NomPrénom}`})).toBeVisible();
    // console.log(beneficiary);

    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // await page.getByRole('button', { label :'Example icon-button with a menu'}).nth(0).click();
    //   await actionsButton.click();
    
   
    

}
