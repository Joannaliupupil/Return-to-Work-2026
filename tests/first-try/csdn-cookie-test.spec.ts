import { test, expect } from '@playwright/test';

// 使用cookie访问
export async function checkLoginStatus(page) {
    // 函数内容
    const userElement = page.locator('.hasAvatar, .user-name');
    return await userElement.count() > 0;
  }
test('使用cookie访问csdn', async ({ browser }) => {
    const context = await browser.newContext();

    const cookies = require('../csdn-cookies.json');
    await context.addCookies(cookies);

    const page = await context.newPage();

    await page.goto('https://www.csdn.net/');

    const userElement = page.locator('.hasAvatar, .user-name');
  
    // 判断元素是否存在
    if (await userElement.count() > 0) { // 如果找到用户元素
        console.log('✅ Cookie登录成功'); // 输出成功信息
    } else {
        console.log('❌ Cookie可能已过期'); // 输出失败信息
    }

    await context.close(); // 关闭浏览器上下文，释放资源
});