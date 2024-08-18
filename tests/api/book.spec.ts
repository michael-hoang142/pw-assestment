import { test, expect } from '@fixture/api';
import { request } from '@playwright/test';


test.describe('POST- Account service - Create user testcases', async () => {
    const isbn = '9781449325862'
    const userID = '60ff9de9-380b-4ba4-9733-c85c143c29f4'

    test.use({
        account: 'zjthnntyss'
    })

    test('OK - Get list books', async () => {
        const context = await request.newContext();
        const response = await context.get('https://demoqa.com/BookStore/v1/Books')
        const body = await JSON.parse(await response.text())
        console.log(await response.json())
        await expect(response.status()).toEqual(200);
    })

    test('OK - POST A New book list', async ({basicAuth}) => {
        const context = await request.newContext();
        const response = await context.post('https://demoqa.com/BookStore/v1/Books', {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "userId": userID,
                "collectionOfIsbns": [
                    {
                        "isbn": isbn
                    }
                ]
            }
        })
        const body = await response.json()
        console.log(body)
        await expect(response.status()).toEqual(201);
        await expect(body).toHaveProperty('books[0].isbn', isbn)
    })

    test('OK - POST A non-exist book list', async ({basicAuth}) => {
        const context = await request.newContext();
        const response = await context.post('https://demoqa.com/BookStore/v1/Books', {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "userId": userID,
                "collectionOfIsbns": [
                    {
                        "isbn": 'non exist'
                    }
                ]
            }
        })
        const body = await response.json()
        console.log(body)
        await expect(response.status()).toEqual(400);
        await expect(body).toHaveProperty('code', '1205')
        await expect(body).toHaveProperty('message', 'ISBN supplied is not available in Books Collection!')
    })

    test('OK - DELETE Added book', async ({basicAuth}) => {
        const context = await request.newContext();
        const response = await context.delete('https://demoqa.com/BookStore/v1/Book', {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "isbn": isbn,
                "userId": userID
              }
        })
        await expect(response.status()).toEqual(204);
    })

    test('OK - DELETE non-added book', async ({basicAuth}) => {
        const context = await request.newContext();
        const response = await context.delete('https://demoqa.com/BookStore/v1/Book', {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "isbn": 'non-add',
                "userId": userID
              }
        })
        const body = await response.json()
        console.log(body)
        await expect(response.status()).toEqual(400);
        await expect(body).toHaveProperty('code', '1206')
        await expect(body).toHaveProperty('message', "ISBN supplied is not available in User's Collection!")
    })

})
