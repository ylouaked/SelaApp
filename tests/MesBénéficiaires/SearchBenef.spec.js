import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { bénéficiaire, loginData, substring } from "../helpers/datas.js";
import { Recherche_Beneficiaire_existe, Recherche_Beneficiaire_Nexiste} from "./SearchBenef.js";




test.use({
    ignoreHTTPSErrors: true, 
});


test('Rechercher un bénéficiaire existant', async({page})  => {
    await login(page, loginData.valid_data);
   
        await Recherche_Beneficiaire_existe(page, bénéficiaire.existe_deja);
  
   
});

test('Rechercher un bénéficiaire qui n\'existe pas', async({page})  => {
    await login(page, loginData.valid_data);
    
    await Recherche_Beneficiaire_Nexiste(page, bénéficiaire.x);
});


