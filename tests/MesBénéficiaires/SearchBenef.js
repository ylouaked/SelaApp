import { expect } from "@playwright/test";





export async function Recherche_Beneficiaire_existe(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.getByRole('cell', { name: `${data.NomPrénom}` })).toBeVisible();

}

export async function Recherche_Beneficiaire_Nexiste(page,data){

    await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
    await expect(page).toHaveTitle(/Mes bénéficiaires/);
    await expect (page.getByPlaceholder('Rechercher')).toBeVisible();
    await (page.getByPlaceholder('Rechercher')).fill(data.NomPrénom);
    await (page.getByPlaceholder('Rechercher')).press('Enter');
    await expect(page.locator('app-empty-page')).toContainText('Aucun bénéficiaire !');
    
    
}


    
