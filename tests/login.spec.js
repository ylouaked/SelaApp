import {  test } from '@playwright/test'; 
import { login, loginWithCase } from './helpers/login.js';
import { loginData } from './helpers/datas.js';


test.use({
    ignoreHTTPSErrors: true, 
});

test('Login avec des informations valides', async ({ page }) => {
  await login(page, loginData.valid_data);
});

test('Login avec un identifiant invalide', async ({ page }) => {
  await login(page, loginData.invalid_user);
});

test('Login avec un mot de passe invalide', async ({ page }) => {
  await login(page, loginData.invalid_psw);
});

test('Login avec identifiant et mot de passe invalides', async ({ page }) => {
  await login(page, loginData.invalid_data);
});

test('Login avec un mot de passe trop court', async ({ page }) => {
  await login(page, loginData.short_psw);
});

test('Login avec identifiant vide' , async ({ page }) => {
  await login(page, loginData.empty_user);
});