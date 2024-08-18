import { test, expect } from '@playwright/test';
import * as landingPage from '@pages/LandingPage';
import * as cardActionPage from '@pages/CardActionPage';

test.describe('TC01', async () => {

  test('TC01 - Scenario A - Verify user can enter new data into the table', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Elements")
    await cardActionPage.clickOnMenuItem({ page }, 'Web Tables')
    await cardActionPage.clickOnAddNewRecordButton({ page })
    await cardActionPage.fillAndSubmitRegistrationForm({ page }, [
      { field: 'First Name', value: 'Quan' },
      { field: 'Last Name', value: 'Quan' },
      { field: 'name@example.com', value: 'khanhquan142@gmail.com' },
      { field: 'Age', value: '19' },
      { field: 'Salary', value: '123' },
      { field: 'Department', value: 'HCM' }
    ])
    await cardActionPage.assertSucceedSubmitRegistration({ page }, 'khanhquan142@gmail.com')
  });

  test('TC01 - Scenario B - Verify user can enter new data into the table', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Elements")
    await cardActionPage.clickOnMenuItem({ page }, 'Web Tables')
    await cardActionPage.editThenAssertRegistrationRow({ page }, 2, [
      { field: 'First Name', value: 'Gerimedica' },
      { field: 'Last Name', value: 'BV' }])
  });

  test('TC02 - Verify broken image', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Elements")
    await cardActionPage.clickOnMenuItem({ page }, 'Broken Links - Images')
    await cardActionPage.assertBrokenImage({page})
  })

  test('TC03 - Verify user can submit the form.', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Forms")
    await cardActionPage.clickOnMenuItem({ page }, 'Practice Form')
    await cardActionPage.fillAndSubmitPraticeForm({ page }, 'Gerimedica', 'BV', 'test@test.com', 'Male',
      '0123456789',
      '15 January 1990',
      'Playwright Assignment',
      ['Reading'],
      'file/afile.jpg',
      'Netherlands',
      'NCR',
      'Delhi'
    )
  })

  test('TC04 - Verify the progress bar', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Widgets")
    await cardActionPage.clickOnMenuItem({ page }, 'Progress Bar')
    await cardActionPage.assertProgressBar({page})
  })

  test('TC05 - Verify the tooltip', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Widgets")
    await cardActionPage.clickOnMenuItem({ page }, 'Tool Tips')
    await cardActionPage.hoverThenAssertTooltip({page}, 'You hovered over the Button')
  })

  test('TC06 - Verify user can drag and drop', async ({ page }) => {
    await landingPage.goToLandingPage({ page })
    await landingPage.clickOnCard({ page }, "Interactions")
    await cardActionPage.clickOnMenuItem({ page }, 'Droppable')
    await cardActionPage.dragAndDropThenAssert({ page })
  })

})

