import {Page,Locator,expect} from '@playwright/test';


export default class BingSearchPage{

    readonly page:Page;
    readonly searchInput:Locator;
    readonly searchResults: Locator;

    constructor(page : Page){
        this.page = page;
        this.searchInput = page.locator(`#sb_form_q`);
    }

    async goto(){

        await this.page.goto("https://www.bing.com");
    }

    async search(keyword:string){
        
        const searchInput = this.page.locator('#sb_form_q');
      try {
        // 等待搜索框可见
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ 搜索框可见');
      } catch (error) {
        console.log('✗ 搜索框不可见:', error.message);
        // 截图看看页面状态
        await this.page.screenshot({ path: 'debug-no-searchbox.png', fullPage: true });
        console.log('已截图: debug-no-searchbox.png');
      }
      await this.searchInput.click();
      console.log('✓ 搜索框点击了');
        await this.searchInput.fill(keyword);

        console.log('填充了内容');
        const newValue = await searchInput.inputValue();
        console.log('   输入后的值:', newValue);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
      
    //   // 等待足够长的时间确保内容加载
      await this.page.waitForTimeout(3000);
    }

    async verifyResult(expected: string) {
        // 将断言逻辑也封装起来，让测试脚本更简洁
        // await expect(this.page).toHaveTitle(new RegExp(expected, 'i'), { timeout: 15000 });

        await expect(this.page.locator('body')).toContainText(expected, {
            timeout: 15000,
            ignoreCase: true
          });
          console.log(`关键字 验证成功！`);
    }
}