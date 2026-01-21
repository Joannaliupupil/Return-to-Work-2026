import { test, expect } from '@playwright/test';
import { request } from 'node:http';

test.use({storageState: 'tests/.auth/user.json'})
// 需要先执行auth.setuo.spec.ts
test('测试用cookie访问登录后的页面',async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/secure');


})