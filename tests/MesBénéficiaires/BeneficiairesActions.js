import { expect } from '@playwright/test'; 
import { bénéficiaire, loginData } from '../helpers/datas.js';
import { otp } from '../helpers/otp.js';


export async function addBeneficiaire(page, data, OTP) {
    await expect(page.getByRole('heading')).toContainText('Ajouter un bénéficiaire');
    await expect(page.getByLabel('Nom et prénom')).toBeVisible();
    await expect(page.getByLabel('RIB')).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeVisible();
    await expect(page.locator('#addBenefiDialog').getByRole('button', { name: 'Annuler' })).toBeEnabled();
    
    await page.getByLabel('Nom et prénom').click();
    await page.getByLabel('Nom et prénom').fill(data.NomPrénom);
    await page.getByLabel('RIB').click();
    await page.getByLabel('RIB').fill(data.RIB);

    switch (data) {
        case bénéficiaire.invalid_rib:
            await expect(page.getByRole('button', { name: 'Ajouter' })).toBeDisabled();
            await page.getByLabel('Nom et prénom').click()
            const errorMessage = page.locator('#mat-error-0');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Le RIB est invalide');
            return;

        case bénéficiaire.existe_deja:
            await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
            await page.getByRole('button', { name: 'Ajouter' }).click();
            await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');

            await enterPassword(page, loginData.valid_data.password);

            await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
            await page.getByRole('button', { name: 'Confirmer' }).click();
            await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0551****32');
            await otp(page, OTP);
            await page.getByRole('button', { name: 'Valider' }).click();
            await expect(page.locator('#mat-dialog-3')).toContainText('Erreur Le bénéficiaire existe déjà');
            await page.getByRole('button', { name: 'OK, Merci' }).click();
            break;

        case bénéficiaire.nouveau_benef:
            await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
            await page.getByRole('button', { name: 'Ajouter' }).click();
            await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');

            await enterPassword(page, loginData.valid_data.password);

            await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
            await page.getByRole('button', { name: 'Confirmer' }).click();
            await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0551****32');
            await otp(page, OTP);
            await page.getByRole('button', { name: 'Valider' }).click();
            await expect(page.locator('#mat-dialog-3')).toContainText('Bénéficiaire ajouté avec succès');
            await page.getByRole('button', { name: 'OK, Merci' }).click();
            break;

        default:
            throw new Error('Cas non pris en charge');
    }
}

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
        await enterPassword(page, loginData.valid_data.password);
            await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
            await page.getByRole('button', { name: 'Confirmer' }).click();
            //pop up de réussite de suppression
            await expect(page.locator('#mat-dialog-2')).toContainText('Suppression de bénéficiaire ');
            await expect(page.locator('#mat-dialog-2')).toContainText('Le bénéficiaire a été supprimé avec succ. OK, Merci');
            await page.getByRole('button', { name: 'OK, Merci' }).click();
            await expect(page.locator('#mat-dialog-2')).toBeHidden();
            await page.reload();
            await expect(page.locator(`mat-row cdk-row ng-star-inserted:has-text("${data.NomPrénom}")`)).toHaveCount(0);
        } 



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
    
     await enterPassword(page, loginData.valid_data.password);
 
     await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
     await page.getByRole('button', { name: 'Confirmer' }).click();
     await expect(page.locator('#mat-dialog-2')).toContainText('Modification de bénéficiaire Le bénéficiaire a été modifié avec succès');
     await page.getByRole('button', { name: 'OK, Merci' }).click();
     await expect(page.getByRole('row', { name: `${data.newName}` })).toBeVisible();
     await browser.close();

}

export async function FavBenef(page, data) {
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    const row = await page.getByRole('row', { name: `${data.NomPrénom}` });
    const favorisButton = await row.locator('button[mattooltip="Ajouter aux favoris"]');
    await favorisButton.click();
    const retirerButton = await row.locator('button[mattooltip="Retirer des favoris"]');
    await expect(retirerButton).toBeVisible();
    await browser.close();
  }
   
  
  export async function DefavBenef(page, data) {
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    const row = await page.getByRole('row', { name: `${data.NomPrénom}` });
    const favorisButton = await row.locator('button[mattooltip="Retirer des favoris"]');
    await favorisButton.click();
    const ajouterButton = await row.locator('button[mattooltip="Ajouter aux favoris"]');
    await expect(ajouterButton).toBeVisible();
  
  }
  

  export async function Recherche_Beneficiairy_existe(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.getByRole('cell', { name: `${data.NomPrénom}` })).toBeVisible();

}

export async function Recherche_Beneficiaire_Nexiste(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.locator('app-empty-page')).toContainText('Aucun bénéficiaire !');
    
    
}
