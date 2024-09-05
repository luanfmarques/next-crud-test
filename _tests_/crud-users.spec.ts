import { test, expect } from "@playwright/test";

const nameFinder = "USERXXYYZZ12345";
const edittedNameFinder = "USERXXYYZZ12345 edit";

test("crud", async ({ page }) => {
  await page.goto("http://localhost:3000/users");

  await expect(page.getByTestId(`user-${nameFinder}`)).toHaveCount(0);

  await page.getByTestId("create-user").click();
  await page.getByTestId("input-name").click();
  await page.getByTestId("input-name").fill(nameFinder);
  await page.getByTestId("input-email").click();
  await page.getByTestId("input-email").fill("emailTeste@gmail.com");
  await page.getByTestId("save-button").click();

  await expect(page.getByText("Usuário criado com sucesso.")).toHaveCount(1);
  await expect(page.getByText(`Nome: ${nameFinder}`)).toHaveCount(1);

  await page
    .getByTestId(`user-${nameFinder}`)
    .getByTestId("edit-button")
    .click();
  await page.getByTestId("input-name").click();
  await page.getByTestId("input-name").fill(edittedNameFinder);
  await page.getByTestId("save-button").click();

  await expect(page.getByText("Usuário editado com sucesso.")).toHaveCount(1);
  await expect(page.getByTestId(`user-${nameFinder}`)).toHaveCount(0);
  await expect(page.getByTestId(`user-${edittedNameFinder}`)).toHaveCount(1);

  await page
    .getByTestId(`user-${edittedNameFinder}`)
    .getByTestId("delete-button")
    .click();

  await expect(page.getByText("Sucesso ao excluir o Usuário.")).toHaveCount(1);
  await expect(page.getByTestId(`user-${edittedNameFinder}`)).toHaveCount(0);
});
