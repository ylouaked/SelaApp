import test from "@playwright/test";
import { login } from './helpers/login.js';
import { loginData,bénéficiaire } from './datas.js';
import { DefavBenef, FavBenef } from "./FavoritesBenef.js";



test.use({
    ignoreHTTPSErrors: true, 
});


test.describe('Vérifier le favoris', () => {
test('Ajouter un bénéficiare aux favoris', async({page})  => {
    await login(page, loginData.valid_data);
    await FavBenef(page, bénéficiaire.existe_deja);

})

test('Retirer un bénéficiare des favoris', async({page})  => {
    await login(page, loginData.valid_data);
    await DefavBenef(page, bénéficiaire.existe_deja);}
)
})
