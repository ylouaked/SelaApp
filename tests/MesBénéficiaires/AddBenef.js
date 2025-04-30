import { expect } from '@playwright/test'; 
import { bénéficiaire, enterPassword, loginData, otp } from '../helpers/datas.js';


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
            break;

        case bénéficiaire.existe_deja:
            await expect(page.getByRole('button', { name: 'Ajouter' })).toBeEnabled();
            await page.getByRole('button', { name: 'Ajouter' }).click();
            await expect(page.locator('#mat-dialog-1')).toContainText('Quel est votre mot de passe?');
            await enterPassword(page, loginData.valid_data.password);
            await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled();
            await page.getByRole('button', { name: 'Confirmer' }).click();
            await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0796****11');
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
            await expect(page.locator('app-otp-keyboard-dialog')).toContainText('Merci de saisir l\'OTP reçu sur votre numéro 0796****11');
            await otp(page, OTP);
            await page.getByRole('button', { name: 'Valider' }).click();
            await expect(page.locator('#mat-dialog-3')).toContainText('Bénéficiaire ajouté avec succès');
            await page.getByRole('button', { name: 'OK, Merci' }).click();
            break;

        default:
            throw new Error('Cas non pris en charge');
    }
}



