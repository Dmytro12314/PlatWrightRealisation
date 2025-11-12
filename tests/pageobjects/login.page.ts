import { Page, Locator } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly loginErrorMessage: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  public readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginErrorMessage = page.locator('[data-test="error"]');
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getLoginErrorMessageText() {
    await this.loginErrorMessage.waitFor({ state: "visible" });
    return await this.loginErrorMessage.textContent();
  }
}

export default LoginPage;
