import { test, expect, request } from '@playwright/test';
import * as ult from '../../util/random'

const badReqDatas = [{}, { "aaaa": "account", "bbb": "password" }, { "passwor": "password should sotre in .env", "accomt": "invalid account" }]

test.describe('POST- Account service - Create user testcases', async () => {

    const userName = ult.random_char(10)

    test('OK - Create new user sucessfully', async ({ page }) => {
        const context = await request.newContext();
        const response = await context.post('https://demoqa.com/Account/v1/User', {
            data: {
                "userName": userName,
                "password": "Abcd@123"
            }

        })
        const body = await JSON.parse(await response.text())
        console.log(await response.json())
        await expect(response.status()).toEqual(201);
        await expect(body).toHaveProperty('userID')
        await expect(body).toHaveProperty('username', userName)
    })

    for (const d of badReqDatas) {
        test(`Bad request - Create new user with invalid data - ${JSON.stringify(d)}`, async ({ page }) => {
            const context = await request.newContext();
            const response = await context.post('https://demoqa.com/Account/v1/User', {
                data: d

            })
            const body = await JSON.parse(await response.text())
            console.log(await response.json())
            await expect(response.status()).toEqual(400);
            await expect(body).toHaveProperty('code', "1200")
            await expect(body).toHaveProperty('message', "UserName and Password required.")
        })
    }

})
