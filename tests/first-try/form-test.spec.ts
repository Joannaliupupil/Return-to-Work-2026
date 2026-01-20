import {test,expect} from '@playwright/test'


test('文本输入框定位',async({page}) => {
    await page.goto('https://demo.testim.io/login');

    const userInput = await page.locator('input[type="text"][tabindex="1"]');

    const textInputCount = await userInput.count();
    console.log(`方法1 - 通过type属性找到 ${textInputCount} 个type="text"的输入框`);
    if(textInputCount == 1){
        await userInput.fill("111111");
    }else{
        
    }
    

    // await page.waitForTimeout(1000);

    // const userByTabindex = page.locator('input[tabindex="1"]');

    // const usernameByRole = page.locator('input[role="input"]');

    // console.log("三种定位输入框的方法");

    const pwdInput = await page.locator('input[type="password"]');
    const pwdInputCount = await pwdInput.count();
    console.log(`方法1 - 通过type属性找到 ${pwdInputCount} 个type="password"的输入框`);
    if(pwdInputCount==1){
        await pwdInput.fill("111111");
    }
    


});