import { test, expect } from "@playwright/test";

const nameFinder = "USERXXYYZZ12345";
const editedNameFinder = "USERXXYYZZ12345 edit";
const emailTest = "emailTeste@gmail.com";

test.describe("Operações CRUD de usuários", () => {
  test("deve criar, editar e excluir um usuário", async ({ page }) => {
    // Navegar para a página de usuários
    await page.goto("http://localhost:3000/users");

    // Verificar se o usuário não existe inicialmente
    await expect(page.getByTestId(`user-${nameFinder}`)).toHaveCount(0);

    // Criar um novo usuário
    await page.getByTestId("create-user").click();
    await page.getByTestId("input-name").fill(nameFinder);
    await page.getByTestId("input-email").fill(emailTest);
    await page.getByTestId("save-button").click();

    // Verificar se o usuário foi criado com sucesso
    await expect(page.getByText("Usuário criado com sucesso.")).toBeVisible();
    await expect(page.getByText(`Nome: ${nameFinder}`)).toBeVisible();

    // Editar o usuário
    await page.getByTestId(`user-${nameFinder}`).getByTestId("edit-button").click();
    await page.getByTestId("input-name").fill(editedNameFinder);
    await page.getByTestId("save-button").click();

    // Verificar se o usuário foi editado com sucesso
    await expect(page.getByText("Usuário editado com sucesso.")).toBeVisible();
    await expect(page.getByTestId(`user-${nameFinder}`)).toHaveCount(0);
    await expect(page.getByTestId(`user-${editedNameFinder}`)).toBeVisible();

    // Excluir o usuário
    await page.getByTestId(`user-${editedNameFinder}`).getByTestId("delete-button").click();

    // Verificar se o usuário foi excluído com sucesso
    await expect(page.getByText("Sucesso ao excluir o Usuário.")).toBeVisible();
    await expect(page.getByTestId(`user-${editedNameFinder}`)).toHaveCount(0);
  });
});
