import { test, expect } from '@playwright/test';


test.describe('API 自动化进阶练习',() => {

    test('获取id为1的帖子',async({request}) => {

        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

        // 验证状态码

        expect(response.status()).toBe(200);

        // 验证响应体
        const body = await response.json();

        console.log(body);

        expect(body.id).toBe(1);
        expect(body.title).not.toBeNull();
        expect(body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
    
    
    });

    // 测试 POST 请求：模拟创建资源（对应你刚才看到的 201）
    test('测试创建帖子',async({ request}) => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts',{
            data: {
                title: 'Test Post',
                body: 'This is a test post',
                userId: 1
            }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        console.log(body);
        expect(body.id).not.toBeNull();
        expect(body.title).toBe('Test Post');
        expect(body.body).toBe('This is a test post');
        expect(body.userId).toBe(1);
    });


    test('测试创建帖子失败',async({ request}) => {
        
            const response = await request.post('https://jsonplaceholder.typicode.com/posts11',{
                data: {
                    title: 'Test Post',
                    body: 'This is a test post',
                    userId: 1
                }
            });
            expect(response.status()).toBe(404);
            const body = await response.json();
           
            expect(response.ok()).toBeFalsy();
        

        
    });

});