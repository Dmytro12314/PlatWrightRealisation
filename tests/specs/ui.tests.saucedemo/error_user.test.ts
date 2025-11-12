import { test, expect } from "@playwright/test";
import LoginPage from "../../pageobjects/login.page";
import InventoryPage from "../../pageobjects/inventory.page";
import CartPage from "../../pageobjects/cart.page";
import CheckoutPage from "../../pageobjects/checkout.page";
import credentials from "../../../utils/credentials";

const creds = credentials;

test.describe("Error user", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
  });

  test("should fail to finish checkout", async ({ page }) => {
    await loginPage.login("error_user", creds.users["error_user"]);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.openCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillOutFirstName();
    await checkoutPage.fillOutLastName();
    await checkoutPage.fillOutZipCode();
    await checkoutPage.continueBtn.click();
    await expect(checkoutPage.checkoutCompleteHeader).not.toBeVisible();
    await expect(checkoutPage.finishBtn).toBeVisible();
    expect(page.url()).toContain("/checkout-step-two.html");
  });
});
