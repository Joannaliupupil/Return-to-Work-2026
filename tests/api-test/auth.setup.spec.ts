import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

test('登录并保存 Cookie', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // 确认登录成功（看到闪现的成功提示）
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // 保存状态到本地
    await page.context().storageState({ path: authFile });
    console.log('身份证（Cookie）已存入 .auth/user.json');
});