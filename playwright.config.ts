import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

let storageState = undefined;
try{
    if(fs.existsSync('./csdn-cookies.json')){
        storageState = './csdn-cookies.json';
        console.log('将使用csdn-cookies.json中的cookie');
    }
}catch(error){
    console.log('无法加载cookie');
}

export default defineConfig({
    testDir:'./tests',
    use:{
        headless:false,
        storageState:storageState,
        // trace:'on-first-retry',
        trace: 'on'
    },
    projects:[
        {
            name:'chromium',
            use:{...devices['Desktop Chrome']},
        },
    ],
});
