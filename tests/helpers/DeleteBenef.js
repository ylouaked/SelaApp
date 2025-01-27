import { expect } from "@playwright/test";



export async function deleteBenef(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);


await page.getByRole('row', { name: `${data.NomPrénom}` }).getByLabel('Example icon-button with a').click(); 
 await page.getByRole('menuitem', { name: 'Supprimer' }).click();
await page.getByRole('button', { name: 'Annuler' }).click();
















//     await expect(page.locator('cell')).toMatchAriaSnapshot(`- cell "Y Yasmine LOUAKED"`);
    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // const beneficiary= await expect(page.getByRole('cell', { name:` Y ${data.NomPrénom}`})).toBeVisible();
    // console.log(beneficiary);

    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // const actionsButton = beneficiary.locator('button.mat-focus-indicator.mat-menu-trigger.mat-icon-button.mat-button-base');
    // await page.getByRole('button', { label :'Example icon-button with a menu'}).nth(0).click();
    //   await actionsButton.click();
    
   
    

}
