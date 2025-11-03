import { test, expect } from "@playwright/test";
import credentials from "../../../utils/credentials";
import LoginPage from "../../pageobjects/saucedemo.pageobjects/login.page";
import InventoryPage from "../../pageobjects/saucedemo.pageobjects/inventory.page";



const creds = credentials;

test.describe("Visual user (Playwright Screenshot)", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
  });

  test("should detect UI layout issues using screenshot test", async ({
    page,
  }) => {
    await loginPage.login("visual_user", creds.users["visual_user"]);
    await inventoryPage.waitForPage(10000);
    await expect(page.locator(".inventory_item")).toHaveCount(6);
    await expect(page).toHaveScreenshot("inventory.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    });
    await expect(page.locator(".shopping_cart_link")).toBeVisible();
    await expect(page.locator(".product_sort_container")).toBeVisible();
  });
});
