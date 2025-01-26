import { expect } from '@playwright/test'; 
import { bénéficiaire, loginData } from './datas.js';
import { bénéficiaire , OTP} from './datas.js';
import { otp } from './helpers/otp.js';


export async function addBeneficiaire(page, data, OTP) {
    
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
    await page.getByLabel('Nom et prénom').fill(data.NomPrénom);
    await page.getByLabel('RIB').click();
    await page.getByLabel('RIB').fill(data.RIB);


       
    if (data === bénéficiaire.invalid_rib) {
        await expect(page.getByRole('button', { name: 'Ajouter' })).toBeDisabled();
        return;
    }


    // switch (data) {
    //     case bénéficiaire.rib_invalid:
            
    //         await expect(page.getByRole('button', { name: 'Ajouter' })).toBeDisabled();
    //         return; 

    //     default:
         
    //         await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
    //         await page.getByRole('button', { name: 'Ajouter' }).click();
    //         break;
    // }
  
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

   
    if (data === bénéficiaire.existe_deja) {
        await expect(page.locator('#mat-dialog-3')).toContainText('Erreur Le bénéficiaire existe déjà');
        await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'OK, Merci' })).toBeEnabled();
        await page.getByRole('button', { name: 'OK, Merci' }).click();
         
    // const beneficiaryRow = page.locator(`.beneficiary-table-row:has-text("${data.NomPrénom}")`);
    // await expect(beneficiaryRow).toBeVisible();
    // await expect(beneficiaryRow).toContainText(data.RIB);
    } else if (data === bénéficiaire.nouveau_benif) {
        await expect(page.locator('#mat-dialog-3')).toContainText('Bénéficiaire ajouté avec succès');
        await page.getByRole('button', { name: 'OK, Merci' }).click();
    } 

    // switch (data) {
    //     case bénéficiaire.existe_deja:
    //         await expect(page.locator('#mat-dialog-3')).toContainText('Erreur Le bénéficiaire existe déjà');
    //         await page.getByRole('button', { name: 'OK, Merci' }).click();
    //         break;

    //     case bénéficiaire.nouveau_benif:
    //         await expect(page.locator('#mat-dialog-3')).toContainText('Bénéficiaire ajouté avec succès');
    //         await page.getByRole('button', { name: 'OK, Merci' }).click();
    //         break;
    // }
}