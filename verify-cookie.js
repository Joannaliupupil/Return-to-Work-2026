const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  console.log("🔍 开始验证CSDN Cookie...");
  
  const cookieFile = path.join(__dirname, "csdn-cookies.json");
  
  // 检查文件是否存在
  if (!fs.existsSync(cookieFile)) {
    console.log("❌ Cookie文件不存在");
    return;
  }
  
  console.log("✅ 找到Cookie文件");
  
  // 读取文件
  const cookies = JSON.parse(fs.readFileSync(cookieFile, "utf8"));
  console.log(`📊 共 ${cookies.length} 个Cookie`);
  
  // 启动浏览器
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  // 添加Cookie
  await context.addCookies(cookies);
  
  const page = await context.newPage();
  
  // 访问CSDN
  console.log("🌐 访问CSDN...");
  await page.goto("https://www.csdn.net/");
  
  // 等待一下
  await page.waitForTimeout(3000);
  
  // 检查页面
  console.log("📄 页面标题:", await page.title());
  
  // 检查登录状态
  console.log("🔎 检查是否已登录...");
  
  // 保持浏览器打开
  console.log("🖥️ 浏览器已打开，请手动检查是否已登录");
  console.log("按 Ctrl+C 退出");
})();