import { test } from '@playwright/test';
import { CodeRetryPage } from '../../page-objects/LoginPage';

test('登录测试', async ({ page }) => {
    const loginPage = new CodeRetryPage(page);
    await loginPage.login();
});