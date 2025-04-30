import { expect} from '@playwright/test'; 


export async function FavBenef(page, data) {
  await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
  await expect(page).toHaveTitle(/Mes bénéficiaires/);
  const row = await page.getByRole('row', { name: `${data.NomPrénom}` });
  const favorisButton = await row.locator('button[mattooltip="Ajouter aux favoris"]');
  await favorisButton.click();
  const retirerButton = await row.locator('button[mattooltip="Retirer des favoris"]');
  await expect(retirerButton).toBeVisible();
}
 

export async function DefavBenef(page, data) {
  await page.locator('mat-list-item >> text=Mes bénéficiaires').click();
  await expect(page).toHaveTitle(/Mes bénéficiaires/);
  const row = await page.getByRole('row', { name: `${data.NomPrénom}` });
  const favorisButton = await row.locator('button[mattooltip="Retirer des favoris"]');
  await favorisButton.click();
  const ajouterButton = await row.locator('button[mattooltip="Ajouter aux favoris"]');
  await expect(ajouterButton).toBeVisible();

}


