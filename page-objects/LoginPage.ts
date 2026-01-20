import { Page, Locator } from '@playwright/test';
export class CodeRetryPage {    
    
    private readonly page: Page;
    private readonly codeInput: Locator;
    private readonly codeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.codeInput = page.locator('#codeInput');
        this.codeButton = page.locator('#codeButton');
    }

    async goto() {
        await this.page.goto('https://www.douban.com/');
    }
    async login(){
        await this.goto();
        await this.fillCode('123456');
        await this.clickCodeButton();
    }

    async fillCode(code: string) {
        await this.codeInput.fill(code);
    }

    async clickCodeButton() {
        await this.codeButton.click();
    }
}    

