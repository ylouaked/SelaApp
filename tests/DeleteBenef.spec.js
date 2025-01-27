import test from "@playwright/test";
import { login } from './helpers/login.js';
import { loginData,bénéficiaire } from './datas.js';
import { deleteBenef } from "./helpers/DeleteBenef.js";



test.use({
    ignoreHTTPSErrors: true, 
});

test('Supprimer un bénéficiaire', async({page})  => {
    await login(page, loginData.valid_data);
    await deleteBenef(page, bénéficiaire.existe_deja);
});
