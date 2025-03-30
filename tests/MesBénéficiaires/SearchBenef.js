import { expect } from "@playwright/test";
import { bénéficiaire, loginData, substring } from '../helpers/datas.js';




export async function SearchBenef(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.getByRole('cell', { name: `${data.NomPrénom}` })).toBeVisible();

}

export async function SearchBenefX(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.locator('app-empty-page')).toContainText('Aucun bénéficiaire !');
    
    
}

export async function SearchSubstring(page, data) {
    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect(page.getByPlaceholder('Rechercher')).toBeVisible();
    await page.getByPlaceholder('Rechercher').fill(substring);
    await page.getByPlaceholder('Rechercher').press('Enter'); 
    await page.waitForSelector('mat-row', { state: 'visible' });
    await expect(page.locator('mat-row ')).toContainText(substring);
   
}

    
