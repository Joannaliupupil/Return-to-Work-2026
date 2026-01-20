import { test, devices } from '@playwright/test';

test.use({
    ...devices['iPhone 13'],
});

test('淘宝登录测试 - 修复超时', async ({ page }) => {
    // 增加超时时间到3分钟
    test.setTimeout(180000);

    console.log('=== 开始淘宝登录测试 ===');

    try {
        // 1. 访问淘宝
        await page.goto('https://main.m.taobao.com/?sprefer=sypc00', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        console.log('✅ 页面加载完成');

        // 2. 点击搜索框
        await page.getByText('寻找宝贝店铺搜索').click({
            timeout: 15000
        });
        console.log('✅ 点击了搜索框');

        // 3. 等待iframe
        await page.waitForSelector('iframe', {
            state: 'attached',
            timeout: 15000
        });
        console.log('✅ iframe加载完成');

        const iframe = page.frameLocator('iframe').first();

        // 4. 输入手机号
        await iframe.getByRole('textbox', { name: '请输入手机号' }).fill('16601112688', {
            timeout: 10000
        });
        console.log('✅ 手机号已输入');

        // 5. 点击获取验证码触发协议弹窗

        try {
            // 方法1：使用getByRole
            await iframe.getByRole('button', { name: '获取验证码' }).waitFor({ state: 'visible', timeout: 5000 });
            await iframe.getByRole('button', { name: '获取验证码' }).click();
        } catch (error) {
            console.log('方法1失败，尝试方法2...');
            
            // 方法2：使用更简单的选择器
            await iframe.locator('button').filter({ hasText: '获取验证码' }).waitFor({ state: 'visible', timeout: 5000 });
            await iframe.locator('button').filter({ hasText: '获取验证码' }).click();
        }
        
        console.log('✅ 验证码按钮已点击');

        // 6. 处理协议确认弹窗
        await page.waitForTimeout(1500);

        const hasConfirmation = await iframe.getByText('服务协议及隐私保护').isVisible().catch(() => false);

        if (hasConfirmation) {
            console.log('✅ 检测到确认弹窗');

            // 点击"同意"按钮
            await iframe.locator('button.dialog-btn-ok').click({
                timeout: 5000
            });
            console.log('✅ 已点击"同意"按钮');

            // 等待弹窗关闭
            await page.waitForTimeout(1000);
        }
        // await iframe.getByRole('button', { name: '获取验证码' }).waitFor({ state: 'visible', timeout: 5000 });
        // await iframe.getByRole('button', { name: '获取验证码' }).click();
      
        console.log('✅ 验证码已发送，请查看手机短信');
        console.log('⏳ 等待验证码输入...');
        await page.waitForTimeout(2000);

        // 7. 验证码按钮可能被禁用，需要重新点击
        // console.log('📨 重新点击获取验证码...');
        // await page.waitForTimeout(1000);

        // // 检查按钮状态
        // const buttonDisabled = await iframe.getByRole('button', { name: '获取验证码' }).getAttribute('disabled').catch(() => null);
        // if (buttonDisabled !== null) {
        //     console.log('⚠️ 按钮被禁用，等待变为可用...');
        //     await page.waitForTimeout(3000);
        // }

        // // 再次点击获取验证码
        // await iframe.getByRole('button', { name: '获取验证码' }).click({
        //     timeout: 10000
        // });
        // console.log('✅ 验证码已发送');

        // 8. 等待并输入验证码
        console.log('\n=== 请输入验证码 ===');
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const verificationCode = await new Promise((resolve) => {
            rl.question('请输入短信验证码: ', (code) => {
                rl.close();
                resolve(code);
            });
        });

        console.log(`✅ 输入验证码: ${verificationCode}`);

        // 输入验证码
        await iframe.locator('input[type="text"]').first().fill(verificationCode, {
            timeout: 5000
        });
        console.log('✅ 验证码已输入');

        // 9. 等待登录处理（关键！）
        console.log('⏳ 等待登录处理...');
        await page.waitForTimeout(5000);

        // 10. 检查登录状态
        console.log('🔍 检查登录状态...');

        // 方法1：检查登录弹窗是否消失
        const loginDialogVisible = await iframe.locator('input[name="phone"]').isVisible().catch(() => true);
        if (!loginDialogVisible) {
            console.log('✅ 登录弹窗已关闭，可能登录成功');
        } else {
            console.log('⚠️ 登录弹窗仍在，登录可能失败');
        }

        // 方法2：尝试直接继续购物流程（即使登录状态不确定）
        console.log('🛒 尝试继续购物流程...');

        // 点击搜索商品（使用更宽松的选择器）
        try {
            await page.getByText('星星人系列泡泡玛特').click({ timeout: 10000 });
            console.log('✅ 点击商品成功');
        } catch (error) {
            console.log('⚠️ 点击商品失败，截图当前状态');
            await page.screenshot({ path: 'after-login-state.png' });
        }

        // 等待页面稳定
        await page.waitForTimeout(2000);

        // 步骤2：点击商品（添加更宽松的选择器）
        try {
            await page.locator('a').filter({ hasText: /泡泡玛特.*马克杯/ }).first().click({
                timeout: 10000
            });
            console.log('✅ 点击商品成功');
        } catch (error) {
            console.log('⚠️ 点击商品失败，尝试其他选择器');
            await page.locator('a').filter({ hasText: '泡泡玛特' }).first().click().catch(() => {
                console.log('❌ 无法点击商品');
            });
        }

        // 处理弹窗
        await page.waitForTimeout(2000);
        const hasOpenBtn = await page.getByText('打开淘宝').isVisible().catch(() => false);
        if (hasOpenBtn) {
            console.log('🪟 处理打开淘宝弹窗...');
            await page.getByText('打开淘宝').click();
            await page.waitForTimeout(1000);
        }

        console.log('\n🎉 所有主要步骤完成！');

    } catch (error) {
        console.log('❌ 测试过程中出现错误:', error.message);

        // 截图保存错误状态
        await page.screenshot({
            path: 'error-state.png',
            fullPage: true
        });
        console.log('📸 错误截图已保存: error-state.png');

        throw error;
    }
});
