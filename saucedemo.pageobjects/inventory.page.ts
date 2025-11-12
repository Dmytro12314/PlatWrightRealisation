import { Page, Locator, expect } from "@playwright/test";

interface ItemData {
  price: string;
  productName: string;
}

export class InventoryPage {
  private readonly page: Page;
  private readonly defaultTimeout: number = 5000;
  private readonly SHOPPING_CART_CONTAINER_ID: string =
    "#shopping_cart_container";
  private readonly SHOPPING_CART_BADGE_CLASS: string = ".shopping_cart_badge";
  private readonly INVENTORY_ITEM_IMAGE_SELECTOR: string =
    ".inventory_item_img img";
  private readonly INVENTORY_ITEM_CONTAINER_CLASS: string = ".inventory_item";
  private readonly INVENTORY_ITEM_NAME_CLASS: string = ".inventory_item_name";
  private readonly INVENTORY_ITEM_PRICE_CLASS: string = ".inventory_item_price";

  private readonly itemIds: string[] = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
    "add-to-cart-sauce-labs-fleece-jacket",
    "add-to-cart-sauce-labs-onesie",
    "add-to-cart-test.allthethings()-t-shirt-(red)",
  ];

  constructor(page: Page) {
    this.page = page;
  }

  private get cartBtn(): Locator {
    return this.page.locator(this.SHOPPING_CART_CONTAINER_ID);
  }

  private get shoppingCartBadge(): Locator {
    return this.page.locator(this.SHOPPING_CART_BADGE_CLASS);
  }

  public get firstItemImage(): Locator {
    return this.page.locator(this.INVENTORY_ITEM_IMAGE_SELECTOR).first();
  }

  public async waitForPage(
    timeout: number = this.defaultTimeout
  ): Promise<void> {
    await this.cartBtn.waitFor({
      state: "visible",
      timeout,
    });
  }

  public async addItemToCart(index: number): Promise<void> {
    const item = this.page.locator(`#${this.itemIds[index]}`);
    await item.waitFor({
      state: "visible",
      timeout: this.defaultTimeout,
    });
    await item.click();
  }

  public async getItemData(index: number): Promise<ItemData> {
    const containers = this.page.locator(this.INVENTORY_ITEM_CONTAINER_CLASS);
    const container = containers.nth(index);

    const title = container.locator(this.INVENTORY_ITEM_NAME_CLASS);
    const price = container.locator(this.INVENTORY_ITEM_PRICE_CLASS);

    return {
      price: (await price.textContent()) || "",
      productName: (await title.textContent()) || "",
    };
  }

  public async openCart(): Promise<void> {
    await this.cartBtn.waitFor({
      state: "visible",
      timeout: this.defaultTimeout,
    });
    await this.cartBtn.click();
  }

  public async checkCartIsEmpty(): Promise<void> {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }
}

export default InventoryPage;
