import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { bénéficiaire, loginData, substring } from "../helpers/datas.js";
import { SearchBenef, SearchBenefX, SearchCaracter, SearchSubstring } from "./SearchBenef.js";




test.use({
    ignoreHTTPSErrors: true, 
});


test('Rechercher un bénéficiaire existant', async({page})  => {
    await login(page, loginData.valid_data);
   
        await SearchBenef(page, bénéficiaire.existe_deja);
  
   
});

test('Rechercher un bénéficiaire qui n\'existe pas', async({page})  => {
    await login(page, loginData.valid_data);
    
    await SearchBenefX(page, bénéficiaire.x);
});

test('Rechercher un bénéficiaire par caractères', async({page})  => {
    await login(page, loginData.valid_data);
    await SearchSubstring(page, substring);
});

