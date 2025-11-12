import { Page, Locator } from "@playwright/test";

class CartPage {
  private readonly page: Page;
  private readonly CHECKOUT_BUTTON_ID: string = "#checkout";
  //private readonly CART_ITEM_CLASS: string = ".cart_item";
  private readonly ITEM_NAME_CLASS: string = ".inventory_item_name";
  private readonly ITEM_PRICE_CLASS: string = ".inventory_item_price";

  constructor(page: Page) {
    this.page = page;
  }

  private get checkoutButton(): Locator {
    return this.page.locator(this.CHECKOUT_BUTTON_ID);
  }

  // private get cartItems(): Locator {
  //   return this.page.locator(this.CART_ITEM_CLASS);
  // } dead code 

  private get cartItemNames(): Locator {
    return this.page.locator(this.ITEM_NAME_CLASS);
  }

  public get firstCartItemName(): Locator {
    return this.cartItemNames.first();
  }

  private get cartItemPrices(): Locator {
    return this.page.locator(this.ITEM_PRICE_CLASS);
  }

  public get firstCartItemPrice(): Locator {
    return this.cartItemPrices.first();
  }

  public async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

export default CartPage;
