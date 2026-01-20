import { test, expect } from '@playwright/test';

test('诊断豆瓣搜索延迟', async ({ page }) => {
  console.log('=== 开始诊断搜索延迟问题 ===');
  
  // 记录开始时间
  const startTime = Date.now();
  
  // 1. 访问首页
  await page.goto('https://movie.douban.com/', {
    waitUntil: 'domcontentloaded', // 改为domcontentloaded，不等待所有资源
    timeout: 30000
  });
  
  const loadTime = Date.now() - startTime;
  console.log(`✅ 页面加载完成，耗时: ${loadTime}ms`);
  
  // 2. 检查搜索框是否可见
  const searchInput = page.getByPlaceholder('搜索电影、电视剧、综艺、影人');
  const isSearchVisible = await searchInput.isVisible().catch(() => false);
  console.log(`搜索框是否可见: ${isSearchVisible}`);
  
  if (!isSearchVisible) {
    console.log('⚠️ 搜索框不可见，截图检查...');
    await page.screenshot({ path: 'search-not-visible.png' });
  }
  
  // 3. 立即点击并输入（不等待）
  console.log('立即尝试点击搜索框...');
  const clickStart = Date.now();
  
  try {
    await searchInput.click({ timeout: 5000 });
    const clickTime = Date.now() - clickStart;
    console.log(`✅ 搜索框点击成功，耗时: ${clickTime}ms`);
  } catch (error) {
    console.log(`❌ 点击失败: ${error.message}`);
  }
  
  // 4. 输入关键词
  console.log('尝试输入关键词...');
  const fillStart = Date.now();
  
  try {
    await searchInput.fill('流浪地球', { timeout: 5000 });
    const fillTime = Date.now() - fillStart;
    console.log(`✅ 关键词输入成功，耗时: ${fillTime}ms`);
  } catch (error) {
    console.log(`❌ 输入失败: ${error.message}`);
  }
  
  // 5. 点击搜索按钮
  console.log('尝试点击搜索按钮...');
  const buttonStart = Date.now();
  
  try {
    await page.getByRole('button', { name: '搜索' }).click({ timeout: 5000 });
    const buttonTime = Date.now() - buttonStart;
    console.log(`✅ 搜索按钮点击成功，耗时: ${buttonTime}ms`);
  } catch (error) {
    console.log(`❌ 按钮点击失败: ${error.message}`);
  }
  
  const totalTime = Date.now() - startTime;
  console.log(`\n=== 诊断完成，总耗时: ${totalTime}ms ===`);
});