import { test } from '@playwright/test';
import { addBeneficiaire } from './AddBenef';

const { login } = require("./helpers/login");
const { loginData, bénéficiaire, OTP } = require("./datas");


test.use({
    ignoreHTTPSErrors: true, 
});


test.beforeEach(async ({page})  => {
    await login(page, loginData.valid_data);
});


test('Ajouter un bénéficiaire qui existe déjà', async ({ page }) => { 
await addBeneficiaire(page, bénéficiaire.existe_deja, OTP)
 } );

 test('Ajouter un bénéficiaire avec succès', async ({ page }) => {
    await addBeneficiaire(page, bénéficiaire.nouveau_benef, OTP);
 });

test('RIB invalide', async ({ page }) => {
     await addBeneficiaire(page, bénéficiaire.invalid_rib);
 });