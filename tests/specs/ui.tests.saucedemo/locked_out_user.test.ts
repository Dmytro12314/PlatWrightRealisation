import { test, expect } from "@playwright/test";
import LoginPage from "../../pageobjects/saucedemo.pageobjects/login.page";
import credentials from "../../../utils/credentials";

const creds = credentials;

test.describe("Locked out user", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("should display error message", async () => {
    await loginPage.login("locked_out_user", creds.users["locked_out_user"]);
    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toContainText(
      "Sorry, this user has been locked out."
    );
    expect(loginPage.page.url()).toBe("https://www.saucedemo.com/");
    await expect(loginPage.loginButton).toBeEnabled();
  });
});
