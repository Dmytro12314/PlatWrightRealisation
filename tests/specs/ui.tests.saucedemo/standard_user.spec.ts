import { test, expect } from "@playwright/test";
import LoginPage from "../../pageobjects/login.page";
import InventoryPage from "../../pageobjects/inventory.page";
import CartPage from "../../pageobjects/cart.page";
import CheckoutPage from "../../pageobjects/checkout.page";
import credentials from "../../../utils/credentials";
const creds = credentials;

test.describe("Standard user flow", () => {
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

  test("should login and complete checkout", async ({ page }) => {
    await loginPage.login("standard_user", creds.users["standard_user"]);
    await inventoryPage.waitForPage();
    await expect(page).toHaveURL(/.*inventory.html/);

    const itemData = await inventoryPage.getItemData(1);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.openCart();

    await expect(cartPage.firstCartItemName).toBeVisible();
    await expect(cartPage.firstCartItemName).toHaveText(itemData.productName);
    await expect(cartPage.firstCartItemPrice).toHaveText(itemData.price);
    await expect(page.locator(".cart_item")).toHaveCount(1);

    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    await checkoutPage.completeCheckoutForm();
    await expect(checkoutPage.checkoutCompleteHeader).toBeVisible({
      timeout: 10000,
    });
    await expect(checkoutPage.checkoutCompleteHeader).toHaveText(
      "Thank you for your order!"
    );
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    await checkoutPage.goBackHome();
    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.checkCartIsEmpty();
  });
});
