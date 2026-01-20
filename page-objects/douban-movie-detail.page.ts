import { Page, Locator } from '@playwright/test';

export class DoubanMovieDetailPage {
  private readonly page: Page;
  private readonly ratingElement: Locator;
  private readonly descriptionElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ratingElement = page.locator('.ll.bigstar');
    this.descriptionElement = page.getByText('近未来，科学家们发现太阳急速衰老膨胀，短时间内包括地球在内的整个太阳系都将被太阳所吞没。为了自救，人类提出一个名为"流浪地球"的大胆计划，即倾全球之力在地球表面');
  }

  async getRating(): Promise<string> {
    return await this.ratingElement.textContent() || '';
  }

  async getDescription(): Promise<string> {
    return await this.descriptionElement.textContent() || '';
  }

  async clickDescription() {
    await this.descriptionElement.click();
  }
}
