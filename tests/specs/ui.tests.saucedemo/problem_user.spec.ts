import { test, expect } from "@playwright/test";
import LoginPage from "../../pageobjects/login.page";
import InventoryPage from "../../pageobjects/inventory.page";
import CartPage from "../../pageobjects/cart.page";
import CheckoutPage from "../../pageobjects/checkout.page";
import credentials from "../../../utils/credentials";

const creds = credentials;

test.describe('Problem user', () => {
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

    test('should detect broken images and form errors', async () => {
        await loginPage.login('problem_user', creds.users['problem_user']);
        await inventoryPage.waitForPage();
        const imgSrc: string = await inventoryPage.firstItemImage.getAttribute('src') || '';
        expect(imgSrc).toContain('sl-404');
        await inventoryPage.addItemToCart(1);
        await inventoryPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillOutFirstName();
        await checkoutPage.fillOutZipCode();
        await checkoutPage.continueBtn.click();
        const errorMessage: string | null = await checkoutPage.getLastNameErrorMessageText();
        expect(errorMessage).toBe('Error: Last Name is required');
    });
});