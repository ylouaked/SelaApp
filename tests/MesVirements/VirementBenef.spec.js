import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { loginData,bénéficiaire } from '../helpers/datas.js';
import { Virement, VirementSimple } from "./VirementBenef.js";


test.use({
    ignoreHTTPSErrors: true, 
});

test('Virement Simple', async({page})  => {
    await login(page, loginData.valid_data);
    await VirementSimple(page,bénéficiaire.VirementBenef);
});


test('Virement mensuel', async({page})  => {
    await login(page, loginData.valid_data);
    await VirementSimple(page,bénéficiaire.VirementBenef);
});



