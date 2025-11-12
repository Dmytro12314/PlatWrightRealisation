import { Page, Locator } from "@playwright/test";

class CheckoutPage {
  private readonly page: Page;
  private readonly defaultTimeout: number = 5000;
  private readonly FIRST_NAME_FIELD: string = '[data-test="firstName"]';
  private readonly LAST_NAME_FIELD: string = '[data-test="lastName"]';
  private readonly ZIP_CODE_ID: string = "#postal-code";
  private readonly CONTINUE_BUTTON_ID: string = "#continue";
  private readonly FINISH_BUTTON_ID: string = "#finish";
  private readonly COMPLETE_HEADER_DATA_TEST: string =
    '[data-test="complete-header"]';
  private readonly BACK_HOME_BUTTON_DATA_TEST: string =
    '[data-test="back-to-products"]';
  private readonly ERROR_MESSAGE_DATA_TEST: string = '[data-test="error"]';
  private readonly DEFAULT_FIRST_NAME: string = "Test";
  private readonly DEFAULT_LAST_NAME: string = "QA";
  private readonly DEFAULT_ZIP_CODE: string = "566279";

  constructor(page: Page) {
    this.page = page;
  }

  public get continueBtn(): Locator {
    return this.page.locator(this.CONTINUE_BUTTON_ID);
  }

  public get finishBtn(): Locator {
    return this.page.locator(this.FINISH_BUTTON_ID);
  }

  public get checkoutCompleteHeader(): Locator {
    return this.page.locator(this.COMPLETE_HEADER_DATA_TEST);
  }

  private get firstName(): Locator {
    return this.page.locator(this.FIRST_NAME_FIELD);
  }

  private get lastName(): Locator {
    return this.page.locator(this.LAST_NAME_FIELD);
  }

  private get zipCode(): Locator {
    return this.page.locator(this.ZIP_CODE_ID);
  }

  public get backHomeBtn(): Locator {
    return this.page.locator(this.BACK_HOME_BUTTON_DATA_TEST);
  }

  private get errorMessage(): Locator {
    return this.page.locator(this.ERROR_MESSAGE_DATA_TEST);
  }

  public async fillOutFirstName(
    value: string = this.DEFAULT_FIRST_NAME
  ): Promise<void> {
    await this.firstName.waitFor({
      state: "visible",
      timeout: this.defaultTimeout,
    });
    await this.firstName.fill(value);
  }

  public async fillOutLastName(
    value: string = this.DEFAULT_LAST_NAME
  ): Promise<void> {
    await this.lastName.waitFor({
      state: "visible",
      timeout: this.defaultTimeout,
    });
    await this.lastName.fill(value);
  }

  public async fillOutZipCode(
    value: string = this.DEFAULT_ZIP_CODE
  ): Promise<void> {
    await this.zipCode.waitFor({
      state: "visible",
      timeout: this.defaultTimeout,
    });
    await this.zipCode.fill(value);
  }

  public async getLastNameErrorMessageText(): Promise<string | null> {
    await this.errorMessage.waitFor({ state: "visible" });
    return await this.errorMessage.textContent();
  }

  public async completeCheckoutForm(): Promise<void> {
    await this.fillOutFirstName();
    await this.fillOutLastName();
    await this.fillOutZipCode();
    await this.continueBtn.click();
    await this.finishBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.finishBtn.click();
  }

  public async goBackHome(): Promise<void> {
    await this.backHomeBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.backHomeBtn.click();
  }

  public async passCheckoutFlow(): Promise<void> {
    await this.completeCheckoutForm();
    await this.goBackHome();
  }
}

export default CheckoutPage;
