import { test, devices } from '@playwright/test';

test.use({
    ...devices['iPhone 13'],
});

test('调试iframe和按钮', async ({ page }) => {
    test.setTimeout(120000);
    
    console.log('🔍 调试iframe和按钮定位');
    
    // 1. 访问淘宝
    await page.goto('https://main.m.taobao.com/?sprefer=sypc00');
    console.log('页面加载完成');
    
    // 2. 点击搜索框
    await page.getByText('寻找宝贝店铺搜索').click();
    console.log('搜索框已点击');
    
    // 3. 等待并检查iframe
    await page.waitForTimeout(3000);
    
    // 检查所有iframe
    const frames = page.frames();
    console.log(`找到 ${frames.length} 个frame`);
    
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        console.log(`\nFrame ${i}:`);
        console.log(`  URL: ${frame.url()}`);
        console.log(`  Name: ${frame.name()}`);
        
        try {
            // 尝试获取frame内的内容
            const hasPhoneInput = await frame.locator('input[type="tel"], input[name="phone"]').count().catch(() => 0);
            const hasButtons = await frame.locator('button').count().catch(() => 0);
            
            console.log(`  电话输入框: ${hasPhoneInput} 个`);
            console.log(`  按钮: ${hasButtons} 个`);
            
            if (hasButtons > 0) {
                const buttons = await frame.locator('button').all();
                for (let j = 0; j < Math.min(buttons.length, 5); j++) {
                    const text = await buttons[j].textContent().catch(() => '无法获取');
                    console.log(`    按钮${j}: "${text}"`);
                }
            }
        } catch (error) {
            console.log(`  访问frame失败: ${error.message}`);
        }
    }
    
    // 4. 使用frame locator
    console.log('\n使用frameLocator:');
    const iframes = await page.locator('iframe').all();
    console.log(`找到 ${iframes.length} 个iframe元素`);
    
    for (let i = 0; i < iframes.length; i++) {
        console.log(`\niframe ${i}:`);
        const iframeLocator = page.frameLocator('iframe').nth(i);
        
        try {
            const visible = await iframeLocator.locator('body').isVisible().catch(() => false);
            console.log(`  是否可见: ${visible}`);
            
            if (visible) {
                const buttons = await iframeLocator.locator('button').all();
                console.log(`  按钮数量: ${buttons.length}`);
                
                for (let j = 0; j < Math.min(buttons.length, 5); j++) {
                    const text = await buttons[j].textContent().catch(() => '无法获取');
                    console.log(`    按钮${j}: "${text}"`);
                }
            }
        } catch (error) {
            console.log(`  访问失败: ${error.message}`);
        }
    }
    
    // 5. 截图
    await page.screenshot({ path: 'debug-iframe.png', fullPage: true });
    console.log('\n📸 调试截图已保存: debug-iframe.png');
    
    console.log('\n=== 调试完成 ===');
    console.log('请检查控制台输出和截图');
});
