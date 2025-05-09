import test from "@playwright/test";
import { login } from '../helpers/login.js';
import { loginData,bénéficiaire } from '../helpers/datas.js';
import { DefavBenef, FavBenef } from "./FavoritesBenef.js";



test.use({
    ignoreHTTPSErrors: true, 
});




test('Retirer un bénéficiare des favoris', async({page})  => {
    await login(page, loginData.valid_data);
    await DefavBenef(page, bénéficiaire.existe_deja);}
);

test('Ajouter un bénéficiare aux favoris', async({page})  => {
    await login(page, loginData.valid_data);
    await FavBenef(page, bénéficiaire.existe_deja);
})
