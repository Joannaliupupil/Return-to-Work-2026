import { test, expect, defineConfig, devices } from '@playwright/test';
import { checkLoginStatus } from './csdn-cookie-test.spec.ts';




test('测试网页抓取和截图内容', async ({ page }) => {

  const cookies = require('../csdn-cookies.json');
  await page.context().addCookies(cookies);
  await page.goto('http://csdn.net');
  // await page.click('#toolbar-btn-loginfun');
  console.log('检查登录状态...');
  // const userElement = page.locator('.hasAvatar, .user-name');
  if (await checkLoginStatus(page)) {
    console.log('✅ 已登录状态');

    console.log('开始定位搜索框');
    const searchbox = page.locator('#toolbar-search-input');
    await searchbox.fill('2026测试趋势');
    await page.click('button[id="toolbar-search-button"]');

    console.log("已经查询出来结果");

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'screenshot/view.png',
      fullPage: true
    });

  } else {
    console.log('❌ 未登录状态');
  }



});




// test('第一个测试：验证网页标题', async ({ page }) => {

//     await page.goto('http://baidu.com');

//     await expect(page).toHaveTitle('Example Domain');

//     console.log('测试通过');
// });

// test('验证页面元素', async ({ page }) => {
//     await page.goto('https://baidu.com');

//     // 验证 h1 元素存在
//     const heading = page.locator('h1');
//     await expect(heading).toBeVisible();
//     await expect(heading).toHaveText('Example Domain');

//     // 验证 p 元素
//     await expect(page.locator('p')).toHaveCount(2);
// });

// // 第三个测试：点击操作
// test('点击链接测试', async ({ page }) => {
//     await page.goto('https://baidu.com');

//     // 点击 "More information..." 链接
//     await page.click('text=More information...');

//     // 验证 URL 变化
//     await expect(page).toHaveURL(/iana\.org/);
// });