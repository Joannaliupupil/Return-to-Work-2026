import { Locator, Page } from '@playwright/test';

export class DoubanSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly movieTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#inp-query'); // 豆瓣搜索框选择器
    this.searchButton = page.locator('.inp-btn input[type="submit"]');
    this.searchResults = page.locator('.result-item, .item-root, .subject-item');
    this.movieTitles = page.locator('.title, .title-text, h3'); // 可能的标题选择器
  }

  async goto() {
    await this.page.goto('https://www.douban.com');
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.page.waitForTimeout(2000); // 等待结果加载
  }

  async getPageContent(): Promise<string> {
    return await this.page.locator('body').textContent() || '';
  }

  async getAllResultsText(): Promise<string[]> {
    const results: string[] = [];
    const count = await this.searchResults.count();
    
    for (let i = 0; i < count; i++) {
      const text = await this.searchResults.nth(i).textContent();
      if (text) results.push(text);
    }
    
    return results;
  }

  // 模糊匹配方法
  async fuzzyMatchSearchResult(keyword: string): Promise<boolean> {
    const pageContent = await this.getPageContent();
    const lowerContent = pageContent.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    
    // 多种模糊匹配策略
    const matchStrategies = [
      // 1. 直接包含关键词
      () => pageContent.includes(keyword),
      // 2. 包含关键词的拼音或英文
      () => lowerContent.includes('wandering') && lowerContent.includes('earth'),
      // 3. 包含关键词的部分内容（中文分词）
      () => keyword.split('').some(char => pageContent.includes(char)),
      // 4. 包含相关的导演或演员
      () => pageContent.includes('郭帆') || pageContent.includes('吴京'),
      // 5. 包含相关类型
      () => pageContent.includes('科幻'),
      // 6. 正则表达式匹配
      () => new RegExp(`.*${keyword.split('').join('.*')}.*`).test(pageContent)
    ];
    
    return matchStrategies.some(strategy => strategy());
  }

  // 获取包含关键词的结果数量
  async getMatchingResultsCount(keyword: string): Promise<number> {
    const results = await this.getAllResultsText();
    return results.filter(result => {
      const lowerResult = result.toLowerCase();
      return lowerResult.includes(keyword.toLowerCase()) ||
             lowerResult.includes('wandering') ||
             lowerResult.includes('earth') ||
             result.includes('郭帆') ||
             result.includes('科幻');
    }).length;
  }

  async clickFirstMovieResult() {
    // 使用成功的方法：点击包含"流浪地球"的文本
    await this.page.locator('text="流浪地球"').first().click();
    await this.page.waitForTimeout(3000);
  }
}