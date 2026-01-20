import { test } from '@playwright/test';

test('诊断搜索结果页面', async ({ page }) => {
  console.log('=== 诊断搜索结果加载 ===');
  
  // 1. 快速完成搜索
  await page.goto('https://movie.douban.com/');
  await page.getByPlaceholder('搜索电影、电视剧、综艺、影人').click();
  await page.getByPlaceholder('搜索电影、电视剧、综艺、影人').fill('流浪地球');
  await page.getByRole('button', { name: '搜索' }).click();
  
  console.log('搜索完成，等待结果...');
  
  // 2. 等待搜索结果出现
  const waitStart = Date.now();
  
  // 尝试多种等待方式
  try {
    // 方式1：等待搜索结果的标题
    await page.waitForSelector('h1', { timeout: 10000 });
    console.log(`✅ 找到h1标题，耗时: ${Date.now() - waitStart}ms`);
    
    // 检查页面标题
    const title = await page.title();
    console.log(`页面标题: ${title}`);

    // 检查搜索结果数量
    const results = await page.locator('.item').count().catch(() => 0);
    console.log(`找到 ${results} 个结果`);
    
    // 检查第一个结果的文本
    const firstResult = await page.locator('.item').first().textContent().catch(() => '无结果');
    console.log('第一个结果前100字符:', firstResult.substring(0, 100));
    
  } catch (error) {
    console.log(`❌ 等待结果失败: ${error.message}`);
    
    // 截图当前页面
    await page.screenshot({ path: 'search-results-failed.png', fullPage: true });
    console.log('📸 截图保存: search-results-failed.png');
  }
  
  // 3. 尝试点击第一个结果（原定位器）
  console.log('\n尝试点击原定位器...');
  try {
    await page.getByText('流浪地球‎ (2019)[可播放]7.9(2036123').click({ timeout: 5000 });
    console.log('✅ 原定位器点击成功');
  } catch (error) {
    console.log(`❌ 原定位器失败: ${error.message}`);

    // 尝试其他定位方式
    console.log('尝试其他定位方式...');
    
    // 方式1：点击第一个包含"流浪地球"的链接
    await page.locator('a').filter({ hasText: '流浪地球' }).first().click({ timeout: 3000 });
    console.log('✅ 备用定位器点击成功');
  }
});