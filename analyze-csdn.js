const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('1. 访问CSDN首页（未登录状态）...');
  await page.goto('https://www.csdn.net/');
  await page.waitForLoadState('networkidle');
  
  console.log('\n=== 当前Cookie（未登录） ===');
  const cookiesBefore = await context.cookies();
  cookiesBefore.forEach(cookie => {
    if (cookie.name.includes('session') || cookie.name.includes('token') || cookie.name.includes('auth')) {
      console.log(`🔑 ${cookie.name}: ${cookie.value.substring(0, 20)}...`);
    }
  });
  
  console.log('\n2. 现在请手动登录CSDN...');
  console.log('点击右上角登录按钮，完成登录');
  console.log('你有60秒时间...');
  
  await page.click('.toolbar-button-login, .login, a[href*="login"]').catch(() => {
    console.log('找不到登录按钮，请手动点击登录');
  });
  
  await page.waitForTimeout(60000);
  
  console.log('\n=== 登录后的Cookie ===');
  const cookiesAfter = await context.cookies();
  const newCookies = cookiesAfter.filter(cookie => 
    !cookiesBefore.some(c => c.name === cookie.name)
  );
  
  if (newCookies.length > 0) {
    console.log('新增加的Cookie:');
    newCookies.forEach(cookie => {
      console.log(`✅ ${cookie.name}: ${cookie.value.substring(0, 30)}...`);
      console.log(`   域名: ${cookie.domain}, 路径: ${cookie.path}`);
    });
    
    // 保存Cookie到文件
    const fs = require('fs');
    fs.writeFileSync('csdn-cookies.json', JSON.stringify(cookiesAfter, null, 2));
    console.log('\n✅ Cookie已保存到 csdn-cookies.json');
  } else {
    console.log('⚠️ 没有发现新的Cookie，CSDN可能使用其他认证方式');
  }
  
  // 检查localStorage
  console.log('\n=== 检查localStorage ===');
  const localStorage = await page.evaluate(() => {
    return Object.keys(localStorage).map(key => ({
      key,
      value: localStorage[key].substring(0, 50)
    }));
  });
  
  localStorage.forEach(item => {
    if (item.key.includes('token') || item.key.includes('user') || item.key.includes('auth')) {
      console.log(`📦 ${item.key}: ${item.value}...`);
    }
  });
  
  console.log('\n🔍 分析完成，浏览器保持打开...');
  console.log('按 Ctrl+C 退出程序');
})();
