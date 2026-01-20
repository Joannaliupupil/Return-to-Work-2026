// import { test, expect } from '@playwright/test';
// import { DoubanSearchPage } from '../../page-objects/douban-home.page';


// test.describe('豆瓣电影搜索测试 - POM模式', () => {
//   let searchPage: DoubanSearchPage;
//   const searchKeyword = '流浪地球';

//   test.beforeEach(async ({ page }) => {
//     searchPage = new DoubanSearchPage(page);
//     await searchPage.goto();
//   });

//   test('应该能搜索到流浪地球相关电影 - 模糊匹配', async () => {
//     console.log(`开始搜索: "${searchKeyword}"`);
    
//     await searchPage.search(searchKeyword);
    
//     // 检查页面标题
//     const title = await searchPage.page.title();
//     console.log(`页面标题: ${title}`);
//     expect(title).toContain(searchKeyword);
    
//     // 模糊匹配验证
//     const hasFuzzyMatch = await searchPage.fuzzyMatchSearchResult(searchKeyword);
//     console.log(`模糊匹配结果: ${hasFuzzyMatch}`);
//     expect(hasFuzzyMatch).toBeTruthy();
    
//     // 获取匹配的结果数量
//     const matchingCount = await searchPage.getMatchingResultsCount(searchKeyword);
//     console.log(`找到 ${matchingCount} 个匹配结果`);
//     expect(matchingCount).toBeGreaterThan(0);
    
//     // 获取并显示部分结果
//     const results = await searchPage.getAllResultsText();
//     console.log(`总结果数量: ${results.length}`);
    
//     if (results.length > 0) {
//       console.log('\n前3个结果预览:');
//       results.slice(0, 3).forEach((result, index) => {
//         console.log(`${index + 1}: ${result.substring(0, 100)}...`);
//       });
//     }
//   });

//   test('搜索结果应包含流浪地球系列电影', async () => {
//     await searchPage.search(searchKeyword);
    
//     const pageContent = await searchPage.getPageContent();
    
//     // 检查是否包含流浪地球系列电影
//     const movieChecks = {
//       '流浪地球 (2019)': pageContent.includes('流浪地球') && pageContent.includes('2019'),
//       '流浪地球2 (2023)': pageContent.includes('流浪地球2') || 
//                          (pageContent.includes('流浪地球') && pageContent.includes('2023')),
//       'Wandering Earth': pageContent.toLowerCase().includes('wandering earth'),
//       '导演郭帆': pageContent.includes('郭帆'),
//       '科幻类型': pageContent.includes('科幻')
//     };
    
//     console.log('电影检查结果:');
//     console.table(movieChecks);
    
//     // 至少有两项检查通过
//     const passedChecks = Object.values(movieChecks).filter(Boolean).length;
//     console.log(`通过 ${passedChecks}/${Object.keys(movieChecks).length} 项检查`);
//     expect(passedChecks).toBeGreaterThanOrEqual(2);
//   });

//   test('搜索结果应显示电影评分信息', async () => {
//     await searchPage.search(searchKeyword);
    
//     const pageContent = await searchPage.getPageContent();
    
//     // 模糊匹配评分信息
//     const hasRating = pageContent.includes('★') || 
//                      pageContent.includes('评分') || 
//                      pageContent.includes('分') || 
//                      /\d\.\d/.test(pageContent);
    
//     console.log(`包含评分信息: ${hasRating}`);
//     expect(hasRating).toBeTruthy();
//   });

//   test('高级模糊匹配测试', async () => {
//     await searchPage.search(searchKeyword);
    
//     const pageContent = await searchPage.getPageContent();
    
//     // 定义多个匹配模式（中文、拼音、英文、相关词）
//     const matchPatterns = [
//       // 中文相关
//       /流浪[球地]+球?/,
//       /流.*浪.*地.*球/,
//       /郭帆/,
//       /吴京/,
//       /科幻/,
      
//       // 拼音/英文相关
//       /wandering.*earth/i,
//       /earth.*wandering/i,
//       /the wandering earth/i,
      
//       // 数字相关（年份、评分）
//       /20(19|23|27)/, // 2019, 2023, 2027
//       /[★☆]/, // 评分星星
//       /\d\.\d/, // 评分如 7.9, 8.3
//     ];
    
//     const matches = matchPatterns
//       .map(pattern => ({
//         pattern: pattern.toString(),
//         matched: pattern.test(pageContent)
//       }))
//       .filter(item => item.matched);
    
//     console.log(`匹配的模式数量: ${matches.length}/${matchPatterns.length}`);
//     console.table(matches);
    
//     // 至少匹配5个模式
//     expect(matches.length).toBeGreaterThanOrEqual(5);
//   });


//   test('应该能点击进入电影详情页', async () => {
//     console.log(`开始搜索: "${searchKeyword}"`);
    
//     await searchPage.search(searchKeyword);
//     await searchPage.page.waitForTimeout(2000);
    
//     // 点击第一个结果
//     await searchPage.clickFirstMovieResult();
    
//     // 验证是否跳转到电影详情页
//     const currentUrl = searchPage.page.url();
//     console.log(`点击后URL: ${currentUrl}`);
    
//     // 验证URL包含电影ID（通常有/subject/数字/）
//     expect(currentUrl).toContain('/subject/');
    
//     // 验证页面标题包含电影名
//     const pageTitle = await searchPage.page.title();
//     console.log(`详情页标题: ${pageTitle}`);
//     expect(pageTitle).toContain('流浪地球');
//   });
// });
import { test, expect } from '@playwright/test';
import path from 'path';

let DoubanSearchPage: any;

test.beforeAll(async () => {
  // 动态导入，使用绝对路径
  const modulePath = path.join(__dirname, '../../page-objects/douban-home.page.ts');
  const module = await import(modulePath);
  DoubanSearchPage = module.DoubanSearchPage;
});

test.describe('豆瓣电影搜索测试 - POM模式', () => {
  let searchPage: any;
  const searchKeyword = '流浪地球';

  test.beforeEach(async ({ page }) => {
    searchPage = new DoubanSearchPage(page);
    await searchPage.goto();
  });

  test('应该能点击进入电影详情页', async () => {
    console.log(`开始搜索: "${searchKeyword}"`);
    
    await searchPage.search(searchKeyword);
    await searchPage.page.waitForTimeout(2000);
    
    // 点击第一个结果
    await searchPage.clickFirstMovieResult();
    
    // 验证是否跳转到电影详情页
    const currentUrl = searchPage.page.url();
    console.log(`点击后URL: ${currentUrl}`);
    
    // 验证URL包含电影ID
    expect(currentUrl).toContain('/subject/');
    
    // 验证页面标题包含电影名
    const pageTitle = await searchPage.page.title();
    console.log(`详情页标题: ${pageTitle}`);
    expect(pageTitle).toContain('流浪地球');
  });
});