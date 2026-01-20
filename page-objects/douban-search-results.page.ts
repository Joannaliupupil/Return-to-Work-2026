import { Page, Locator } from '@playwright/test';

export class DoubanSearchResultsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickFirstResult() {
    await this.page.getByText('%流浪地球%').click();
  }

  async getFirstResultTitle() {
    return await this.page.getByText('%流浪地球%').textContent();
  }
}
