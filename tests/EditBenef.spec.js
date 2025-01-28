import { test } from '@playwright/test'; 
import { login } from './helpers/login.js';
import { loginData,bénéficiaire } from './datas.js';
import { EditBenef } from './EditBenef.js';

test.use({
    ignoreHTTPSErrors: true, 
});

test('Modifier un bénéficiaire', async({page})  => {
    await login(page, loginData.valid_data);
    await EditBenef(page, bénéficiaire.existe_deja);
});