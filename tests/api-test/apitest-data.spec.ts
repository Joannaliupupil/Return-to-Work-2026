import { test, expect } from '@playwright/test';
import searchData from '/Users/joanna/Documents/return-ide/Return-to-Work-2026/tests/data/searchData.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('测试多组数据驱动', () => {
  for (const data of searchData) {
    test(`搜索关键字: ${data.keyword}`, async ({ page }) => {
      // 访问 Bing
      await page.goto('https://www.bing.com');
      test.setTimeout(60000);
      // 输入并搜索
      const inputbox = page.locator('#sb_form_q');
      try {
        // 等待搜索框可见
        await inputbox.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ 搜索框可见');
      } catch (error) {
        console.log('✗ 搜索框不可见:', error.message);
        // 截图看看页面状态
        await page.screenshot({ path: 'debug-no-searchbox.png', fullPage: true });
        console.log('已截图: debug-no-searchbox.png');
      }

    const count = await inputbox.count();
    console.log('搜索框的数量',count);
      console.log('输入框有没有被填充东西',data.keyword);
      console.log('输入框有没有被填充东西',data.keyword);
      console.log('输入框有没有被填充东西',data.keyword);

      console.log('6. 尝试点击搜索框...');
      await inputbox.click();
      await page.waitForTimeout(1000);
      
      // 尝试输入
      console.log('7. 尝试输入 "test"...');
      await inputbox.fill(data.keyword);
          //   await page.locator('#sb_form_q').fill(data.keyword);

      const newValue = await inputbox.inputValue();
      console.log('   输入后的值:', newValue);

      if (newValue === 'test') {
        console.log('✓ 输入成功！');
      } else {
        console.log('✗ 输入失败，实际值:', newValue);
      }
      await page.locator('#sb_form_q').press('Enter');
      
      // 等待页面跳转
      await page.waitForLoadState('networkidle');
      
    //   // 等待足够长的时间确保内容加载
      await page.waitForTimeout(3000);
      
    //   // 调试：打印页面内容
      const bodyText = await page.textContent('body');
      console.log(`页面是否包含 "${data.expected}": ${bodyText?.includes(data.expected)}`);
      
    //   // 直接检查整个页面，而不是特定元素
      await expect(page.locator('body')).toContainText(data.expected, {
        timeout: 15000,
        ignoreCase: true
      });
      
      console.log(`关键字 "${data.keyword}" 验证成功！`);
    });
  }
});