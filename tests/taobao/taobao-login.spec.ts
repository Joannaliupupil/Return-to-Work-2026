import { test, devices } from '@playwright/test';

test.use({
    ...devices['iPhone 13'],
});

test('淘宝登录测试', async ({ page }) => {
    // 设置超时时间
    test.setTimeout(60000);
    
    console.log('=== 开始淘宝登录测试 ===');
    
    // 1. 访问淘宝
    await page.goto('https://main.m.taobao.com/?sprefer=sypc00');
    console.log('✅ 页面加载完成');
    
    // 2. 点击搜索框（触发登录弹窗）
    await page.getByText('寻找宝贝店铺搜索').click();
    console.log('✅ 点击了搜索框');
    
    // 3. 等待iframe加载
    await page.waitForSelector('iframe', { timeout: 10000 });
    console.log('✅ iframe加载完成');
    
    // 4. 输入手机号
    const iframe = page.frameLocator('iframe').first();
    await iframe.getByRole('textbox', { name: '请输入手机号' }).click();
    await iframe.getByRole('textbox', { name: '请输入手机号' }).fill('16601112688');
    console.log('✅ 手机号已输入');
    await iframe.getByRole('button', { name: '获取验证码' }).click();
    console.log('✅ 验证码按钮已点击');
    
        // 4. 点击协议文本（这会触发确认弹窗）
        console.log('📋 点击协议文本...');
        // await iframe.getByText('已阅读并同意').click();
        
        // 5. 等待确认弹窗出现
        console.log('⏳ 等待确认弹窗...');
        
        // 方法1：等待弹窗内的"同意"按钮
        await page.waitForTimeout(1000);
        
        // 检查是否有确认弹窗
        const hasConfirmation = await iframe.getByText('服务协议及隐私保护').isVisible().catch(() => false);
        
        if (hasConfirmation) {
            console.log('✅ 检测到确认弹窗');
            
            // 截图确认弹窗
            await page.screenshot({ path: 'confirmation-dialog.png' });
            console.log('📸 确认弹窗截图已保存');

            
            // 点击"同意"按钮（根据你的截图）
            await iframe.locator('button.dialog-btn-ok').click();
            console.log('✅ 已点击"同意"按钮');
        } else {
            console.log('⚠️ 未检测到确认弹窗，可能已自动同意');
        }
        
        // 6. 等待弹窗关闭
        await page.waitForTimeout(1000);
        
        // 7. 验证协议是否已勾选
        const isChecked = await iframe.locator('input[type="checkbox"]:checked').isVisible().catch(() => false);
        if (isChecked) {
            console.log('✅ 协议复选框已勾选');
        } else {
            // 如果没有勾选，可能需要直接点击复选框
            await iframe.locator('input[type="checkbox"]').check();
            console.log('✅ 已手动勾选复选框');
        }
    
    // 6. 点击获取验证码
    // await iframe.getByRole('button', { name: '获取验证码' }).click();
    // console.log('✅ 验证码按钮已点击');
    
    // 暂停测试，等待手动操作
    console.log('\n=== 重要：请手动操作 ===');
    console.log('1. 查看手机短信获取验证码');
    console.log('2. 如果有滑块验证，请手动拖动');
    console.log('3. 完成后，请在控制台输入验证码');
    
    // 使用同步方式等待输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const verificationCode = await new Promise((resolve) => {
        rl.question('请输入验证码: ', (code) => {
            rl.close();
            resolve(code);
        });
    });
    
    console.log(`✅ 收到验证码: ${verificationCode}`);
    
    // 7. 输入验证码
    await iframe.locator('input[type="text"]').first().click();
    await iframe.locator('input[type="text"]').first().fill(verificationCode);
    console.log('✅ 验证码已输入');
    
    // 8. 等待登录完成
    await page.waitForTimeout(3000);
    
    console.log('\n=== 测试完成 ===');
    console.log('请检查是否登录成功');



    await page.getByText('星星人系列泡泡玛特').click();
    await page.getByRole('link', { name: '泡泡玛特星星人联名马克杯创意奶油胶陶瓷杯子送女生闺蜜手工礼物 ¥ 191. 00 100+人付款' }).click();
    await page.getByText('打开淘宝').click();
    await page.getByText('打开淘宝').click();
    await page.goto('https://main.m.taobao.com/search/index.html?spm=a215s.7406091.topbar.1.560c6770t1leU1&pageType=3&q=%E6%98%9F%E6%98%9F%E4%BA%BA%E7%B3%BB%E5%88%97%E6%B3%A1%E6%B3%A1%E7%8E%9B%E7%89%B9');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('mkxk');
    await page.getByText('麦馨咖啡').click();
    await page.getByRole('link', { name: '麦馨maxim韩国原装进口摩卡三合一速溶咖啡1.' }).click();
});
