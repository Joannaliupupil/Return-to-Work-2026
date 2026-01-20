import { test as setup, expect } from '@playwright/test';

setup('测试用cookie访问登录后的页面', async ({ request }) => {
    const response = await request.post('https://demo.realworld.io//api/users/login', {
        data: {
            user: {
                email: "testname@qq.com",
                password: "testname"
            }

        }
    });

    expect(response.status()).toBe(200);
    const responseBody = response.json;
    const token = responseBody.user.token;
    console.log('成功获取 Token:', token);

    // 验证 Token 不为空
    expect(token).not.toBeNull();

});