import { test, expect } from '@playwright/test';

export enum PAGE {
    "Web Tables" = "webtables",
    "Broken Links - Images" = "broken",
    "Practice Form" = "automation-practice-form",
    "Tool Tips" = "tool-tips",
    "Progress Bar" = "progress-bar",
    "Droppable" = "droppable"
}

export async function navigateToPage({ page }, pageName: PAGE) {
    await page.goto(`/${pageName.valueOf()}`)
    await expect(await page.locator("//div[@class='main-header']")).toHaveText(pageName)
}

export async function clickOnMenuItem({ page }, name: string) {
    await page.locator(`//span[text()='${name}']//ancestor::li`).click()
    await expect(page).toHaveURL(PAGE[name])
}

export async function clickOnAddNewRecordButton({ page }) {
    await page.getByTestId('addNewRecordButton').click()
    await expect(await page.getByTestId('registration-form-modal')).toBeVisible()
}

export async function fillAndSubmitRegistrationForm({ page }, reqs: { field: string, value: string }[]) {
    for (const r of reqs) {
        await page.getByPlaceholder(r.field).clear();
        await page.getByPlaceholder(r.field).fill(r.value);
    }
    await page.getByTestId('submit').click()
    await expect(await page.getByTestId('registration-form-modal')).not.toBeVisible()
}

export async function assertSucceedSubmitRegistration({ page }, email: string) {
    await expect(await page.getByRole('gridcell', { name: email })).toBeVisible()
}

export async function editThenAssertRegistrationRow({ page }, rowIndex: number, reqs: { field: string, value: string }[]) {
    await page.locator(`//div[@role='rowgroup'][${rowIndex}]//span[@id='edit-record-${rowIndex}']`).click();
    await fillAndSubmitRegistrationForm({ page }, reqs)
    for (const r of reqs) {
        if (r.field === 'First Name') {
            await expect(page.locator(`//div[@role='rowgroup'][${rowIndex}]//div[@role='gridcell'][1]`)).toHaveText(r.value)
        }
        if (r.field === 'Last Name') {
            await expect(page.locator(`//div[@role='rowgroup'][${rowIndex}]//div[@role='gridcell'][2]`)).toHaveText(r.value)
        }
    }
}

export async function assertBrokenImage({ page }) {
    await expect(await page.locator("//img[@src='/images/Toolsqa_2.jpg']")).toHaveJSProperty('naturalHeight', 0)
}

export async function fillAndSubmitPraticeForm({ page }, fn: string, ln: string, email: string,  gender: string,mobile: string,
    dob: string, sub: string, hobs: string[], picPath: string, address: string, city: string, state: string) {
    await page.getByPlaceholder('First Name').fill(fn);
    await page.getByPlaceholder('Last Name').fill(ln);
    await page.getByPlaceholder('name@example.com').fill(email);
    await page.locator(`//label[text()='${gender}']`).click()
    await page.getByPlaceholder('Mobile Number').fill(mobile);
    await page.getByTestId('dateOfBirthInput').fill(dob);
    await page.getByTestId('dateOfBirthInput').press('Escape');
    await page.getByTestId('subjectsInput').pressSequentially(sub, {delay: 100});

    for (const h of hobs) {
        await page.locator(`//label[text()='${h}']`).click();
    }

    await page.locator("//input[@id='uploadPicture']").setInputFiles(picPath);
    await page.getByPlaceholder('Current Address').fill(address);

    await page.locator("//div[text()='Select State']").click();
    await page.locator(`//div[text()='${city}']`).click();
    await page.locator("//div[text()='Select City']").click();
    await page.locator(`//div[text()='${state}']`).click();
    await page.getByTestId('submit').click()
    await expect(await page.getByText('Thanks for submitting the form')).toBeVisible()
    await expect(await page.getByText(fn)).toBeVisible()
    await expect(await page.getByText(ln)).toBeVisible()
    await expect(await page.getByText(mobile)).toBeVisible()
    await expect(await page.getByText(email)).toBeVisible()
}
export async function assertProgressBar({page}){
    await page.getByTestId('startStopButton').click();
    await expect(await page.getByTestId('resetButton')).toBeVisible({timeout: 15000})
}
export async function hoverThenAssertTooltip({page}, expectedMess:string) {
    await page.getByTestId('toolTipButton').hover()
    const actualText = await page.locator("//div[@class='tooltip-inner']").textContent()
    await expect(actualText).toEqual(expectedMess)
    
}

export async function dragAndDropThenAssert({page}) {
    await page.getByTestId('draggable').dragTo(page.locator("//div[@id='simpleDropContainer']/div[@id='droppable']"));
    await expect(await page.getByText('Dropped!')).toBeVisible()

}

