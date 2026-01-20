import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://movie.douban.com/');
  await page.getByPlaceholder('搜索电影、电视剧、综艺、影人').click();
  await page.getByPlaceholder('搜索电影、电视剧、综艺、影人').fill('流浪地球');
  await page.getByRole('button', { name: '搜索' }).click();
  await page.getByText('流浪地球‎ (2019)[可播放]7.9(2036123').click();
  await page.getByText('流浪地球‎ (2019)').click();
  await page.locator('.ll.bigstar').click();
  await page.getByText('近未来，科学家们发现太阳急速衰老膨胀，短时间内包括地球在内的整个太阳系都将被太阳所吞没。为了自救，人类提出一个名为“流浪地球”的大胆计划，即倾全球之力在地球表面').click();
  await page.getByText('流浪地球的剧情简介').click();
});