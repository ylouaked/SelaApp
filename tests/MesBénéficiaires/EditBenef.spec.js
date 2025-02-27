import { test } from '@playwright/test'; 
import { login } from '../helpers/login.js';
import { EditBenef } from './EditBenef.js';
import { bénéficiaire, loginData } from '../helpers/datas.js';

test.use({
    ignoreHTTPSErrors: true, 
});

test('Modifier un bénéficiaire', async({page})  => {
    await login(page, loginData.valid_data);
    await EditBenef(page, bénéficiaire.existe_deja);
});