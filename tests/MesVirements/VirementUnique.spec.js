import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { loginData, virements } from '../helpers/datas.js';
import { VirementDinarsMensuel, VirementSimpleDinars } from "./VirementUnique.js";


test.use({
    ignoreHTTPSErrors: true, 
});

test('Virement Dinars Simple ', async({page})  => {
    await login(page, loginData.valid_data);
    await VirementSimpleDinars(page, virements.simpleDinars,false)
});

test('Virement Dinars  Mensuel ', async({page})  => {
    await login(page, loginData.valid_data);
    await VirementSimpleDinars(page, virements.simpleDinars,true)
});


// test('Virement Devise Simple ', async({page})  => {
//     await login(page, loginData.valid_data);
//     await VirementDeviseSimple(page,bénéficiaire.VirementBenef);
// });

// test('Virement Devise Permanent', async({page})  => {
//     await login(page, loginData.valid_data);
//     await VirementDevisePermanent(page,bénéficiaire.VirementBenef);
// });



