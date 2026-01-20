import { test, expect } from '@playwright/test';
import { request } from 'node:http';

test('测试用cookie访问登录后的页面',async({request}) =>{
    const response = await request.post('https://demo.realworld.io//api/users/login',{
        data:{
            email: "testname@qq.com",
            password: "testname"
        }
    });
    const token = response.body();
    console.log(token);



})