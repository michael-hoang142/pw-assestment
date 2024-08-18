import { test as base, request } from '@playwright/test';

export const test = base.extend<{ account: string, token: string, basicAuth: string }>({
    account: 'default',
    token: async ({ account }, use) => {
        const context = await request.newContext();
        const response = await context.post('https://demoqa.com/Account/v1/GenerateToken', {
            data: {
                "userName": account,
                "password": "Abcd@123"
            }
        })
        const body = await response.json()
        use(body.token)
    },
    basicAuth: async ({account}, use) =>{
        const basicAuth = Buffer.from(`${account}:Abcd@123`).toString('base64')
        use(basicAuth)
    }
}
);
export const expect = test.expect;

