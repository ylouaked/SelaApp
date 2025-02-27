import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { loginData,bénéficiaire } from '../helpers/datas.js';
import { deleteBenef } from "./DeleteBenef.js";




test.use({
    ignoreHTTPSErrors: true, 
});

test('Supprimer un bénéficiaire', async({page})  => {
    await login(page, loginData.valid_data);
    try {
         await deleteBenef(page, bénéficiaire.existe_deja);
    } catch (error) {
        
        console.error("Error  :", error);
       
    }
   
});
