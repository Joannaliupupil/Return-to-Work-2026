import {test , expect} from '@playwright/test';
import searchData from '/Users/joanna/Documents/return-ide/Return-to-Work-2026/tests/data/searchData.json';
test.use({ storageState: { cookies: [], origins: [] } });
test.describe('测试多组数据驱动',()=> {
    for(const data of searchData){
        test(`搜索关键字: ${data.keyword}`,async ({page}) => {
            await page.goto('https://www.bing.com');

            const searchInput = page.locator('#sb_form_q');
            await searchInput.fill(data.keyword);

            console.log(searchData);

            await searchInput.press('Enter');
            await page.waitForURL(/search|bing\.com\/search/, { timeout: 15000 });
            await page.waitForLoadState('networkidle');

            const results = page.locator('#b_results');
        //     await expect(page.locator('#b_results')).toContainText(data.expected, { timeout: 10000 });
        //     console.log(`关键字 "${data.keyword}" 验证成功！`);

        const possibleContainers = [
            '#b_results',
            '.b_results',
            '#b_content',
            'main',
            'ol#b_results',
            '[aria-label="Search Results"]'
          ];
          
          let foundContainer = null;
          for (const selector of possibleContainers) {
            const container = page.locator(selector);
            if (await container.count() > 0) {
              foundContainer = container;
              console.log(`使用容器选择器: ${selector}`);
              break;
            }
          }
        //   增加处理 如果页面有弹窗确认，需要增加点击来使页面正常跳转
          // 如果找到容器，在容器内检查文本
          if (foundContainer) {
            await expect(foundContainer).toContainText(data.expected, { 
              timeout: 15000,
              ignoreCase: true 
            });
          } else {
            // 否则在整个页面检查
            await expect(page).toContainText(data.expected, { 
              timeout: 15000,
              ignoreCase: true 
            });
          }
          
          console.log(`关键字 "${data.keyword}" 验证成功！`);
        });
        
    }
})
