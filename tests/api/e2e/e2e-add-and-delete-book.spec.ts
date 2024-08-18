import { test, expect, request } from '@playwright/test';
import * as ult from '../../../util/random'

test.describe.configure({ mode: 'serial' });

test.describe('E2E- Create then delete book flow', async () => {
    let userID;
    const userName = ult.random_char(10)
    const basicAuth = Buffer.from(`${userName}:Abcd@123`).toString('base64')
    let isbn;

    test('OK - Create new user sucessfully', async () => {
        const context = await request.newContext();
        const response = await context.post('https://demoqa.com/Account/v1/User', {
            data: {
                "userName": userName,
                "password": "Abcd@123"
            }

        })
        const body = await response.json()
        console.log(body)
        await expect(response.status()).toEqual(201);
        await expect(body).toHaveProperty('userID')
        await expect(body).toHaveProperty('username', userName)
        userID = body.userID
    })

    test('OK - Get list books', async () => {
        const context = await request.newContext();
        const response = await context.get('https://demoqa.com/BookStore/v1/Books')
        const body = await response.json()
        console.log(await response.json())
        await expect(response.status()).toEqual(200);
        const books = body.books
        const bookNum = books.length
        const randomBook = books.at(ult.random_char(bookNum))
        isbn = randomBook.isbn
    })

    test('OK - POST A New book list', async () => {
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

    test('OK - DELETE Added book', async () => {
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

})
