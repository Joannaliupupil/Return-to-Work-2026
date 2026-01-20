import { Page, Locator } from '@playwright/test';

export class DoubanHomePage {
  private readonly page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('搜索电影、电视剧、综艺、影人');
    this.searchButton = page.getByRole('button', { name: '搜索' });
  }

  async goto() {
    await this.page.goto('https://movie.douban.com/');
  }

  async searchMovie(keyword: string) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}
