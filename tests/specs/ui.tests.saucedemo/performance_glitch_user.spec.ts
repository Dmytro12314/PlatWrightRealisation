import { test, expect } from "@playwright/test";
import LoginPage from "../../pageobjects/saucedemo.pageobjects/login.page";
import InventoryPage from "../../pageobjects/saucedemo.pageobjects/inventory.page";
import CartPage from "../../pageobjects/saucedemo.pageobjects/cart.page";
import CheckoutPage from "../../pageobjects/saucedemo.pageobjects/checkout.page";
import credentials from "../../../utils/credentials";


const creds = credentials;

test.describe("Performance glitch user", () => {
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

  test("should load slowly but complete checkout", async ({ page }) => {
    await loginPage.login(
      "performance_glitch_user",
      creds.users["performance_glitch_user"]
    );
    await inventoryPage.waitForPage(10000);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.openCart();
    await cartPage.clickCheckout();
    await checkoutPage.completeCheckoutForm();
    await expect(checkoutPage.checkoutCompleteHeader).toBeVisible({
      timeout: 10000,
    });
    await expect(checkoutPage.checkoutCompleteHeader).toContainText(
      "Thank you for your order"
    );
    expect(page.url()).toContain("/checkout-complete.html");
    await checkoutPage.goBackHome();
    await inventoryPage.checkCartIsEmpty();
  });
});
