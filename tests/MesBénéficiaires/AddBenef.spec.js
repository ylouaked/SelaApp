import { test } from '@playwright/test';
import { addBeneficiaire } from './AddBenef';

const { login } = require("../helpers/login");
const { loginData, bénéficiaire, OTP } = require("../helpers/datas");

test.describe('Vérifier l\'ajout d\'un bénéficiare depuis "Mes Bénéficiaires"', () => {
test.use({
    ignoreHTTPSErrors: true, 
});


test.beforeEach(async ({page})  => {
    await login(page, loginData.valid_data);
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await page.getByRole('button', { name: 'Ajouter un bénéficiaire' }).click();
});


test('Ajouter un bénéficiaire qui existe déjà', async ({ page }) => { 
await addBeneficiaire(page, bénéficiaire.existe_deja, OTP)
 } );
 
 test('Ajouter un bénéficiaire avec succès', async ({ page }) => {
         await addBeneficiaire(page, bénéficiaire.existe_deja, OTP);
 });

test('RIB invalide', async ({ page }) => {
     await addBeneficiaire(page, bénéficiaire.invalid_rib);
 })});