import {test,expect} from '@playwright/test';

import BingSearchPage from '../../pages/BingSearchPage.ts';

import searchData from '../data/searchData.json';

test.describe('测试pom引入对象',() =>{
    for (const data of searchData) {
        test(`搜索关键字: ${data.keyword}`, async ({ page }) => {
            const searchPage = new BingSearchPage(page);
            await searchPage.goto();
        
            await searchPage.search(data.keyword);
        
            await searchPage.verifyResult('data.expected');

        })}
    
})

