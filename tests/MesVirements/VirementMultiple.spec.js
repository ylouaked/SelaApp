import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { loginData, virements } from '../helpers/datas.js';
import { VirementDinarsMensuel,  } from "./VirementUnique.js";
import { VirementMultipleDinars } from "./VirementMultiple.js";


test.use({
    ignoreHTTPSErrors: true, 
});

test('Virement Dinars Multiple ', async({page})  => {
    await login(page, loginData.valid_data);
    await VirementMultipleDinars(page, virements.multipleDinars);
});

// test('Virement Dinars Multiple Mensuel ', async ({ page }) => {
//     await login(page, loginData.valid_data);
//     await VirementDinarsMultipleMensuel(page,virements.simple.dinars);
//   });