// Importing functions from playwright test module
const { test, expect } = require('@playwright/test');
// Referencing test data page
const testdata = require('./testdata.json');
// Referencing locators page
const locators = require('./pageLocators');

// Test Case 1 - Web Application
test('Test Case 1', async ({ page }) => {

    const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4')
    const actionableItem = 'Implement user authentication'
    let found = false
    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

    // Making sure user is on web application page by printing out the header
    const headingText = await page.locator(locators.heading(testdata.expectedHeading)).textContent();
    console.log(headingText);

    // Verifying "Implement user authentication" is in the "To Do" column, "Feature" & "High Priority” tags are displayed
    const count = await columns.count();

    for (let i = 0; i < count; i++) {
        const columnHeader = await columns.nth(i).locator('h2').textContent();

        if (columnHeader && columnHeader.includes("To Do")) {
            const items = columns.nth(i).locator('h3');
            const itemCount = await items.count();

            for (let j = 0; j < itemCount; j++) {
                const itemText = await items.nth(j).textContent();

                if (itemText && itemText.trim() === actionableItem) {
                    console.log('Implement user authentication is under the "To Do" list');

                    // Check for "Feature" and "High Priority" tags
                    const featureTag = await columns.nth(i).locator(`h3:text("${actionableItem}") ~ div span:text("Feature")`).isVisible();
                    const highPriorityTag = await columns.nth(i).locator(`h3:text("${actionableItem}") ~ div span:text("High Priority")`).isVisible();


                    if (featureTag && highPriorityTag) {
                        console.log('"Feature" and "High Priority" tags are visible.');
                    } else {
                        console.log('Tags not found: Test failed.');
                    }

                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }

    if (!found) {
        console.log('Test failed: Implement user authentication is not found in the "To Do" column.');
    }
})

// Test Case 2 - Web Application
test('Test Case 2', async ({ page }) => {

    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

    // Making sure user is on web application page by printing out the header
    const headingText = await page.locator(locators.heading(testdata.expectedHeading)).textContent();
    console.log(headingText);

    // Verifying "Fix navigation bug" is in the "To Do" column & "Bug" tag is displayed
    const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
    const actionableItem = 'Fix navigation bug';
    let found = false;

    const count = await columns.count();
    for (let i = 0; i < count; i++) {
        const itemText = await columns.nth(i).locator('h3:text("Fix navigation bug")').textContent();
        if (itemText && itemText.trim() === actionableItem) {
            console.log('"Fix navigation bug" is under the "To Do" list');
            found = true;

            // Verifying the "Bug" tag is displayed
            const bugTagVisible = await columns.nth(i).locator('span:text("Bug")').isVisible();
            if (bugTagVisible) {
                console.log('"Bug" tag is displayed');
            } else {
                console.log('"Bug" tag is not found');
            }
            break;
        }
    }

    if (!found) {
        console.log('Test failed: "Fix navigation bug" not found in the "To Do" column');
    }

})

// Test Case 3 - Web Application
test('Test Case 3', async ({ page }) => {

    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

    // Waiting for page to load since tc was running fast and failing the test
    await page.waitForLoadState('domcontentloaded')

    // Making sure user is on web application page by printing out the header
    const headingText = await page.locator(locators.heading(testdata.expectedHeading)).textContent();
    console.log(headingText);

    // Verify "Design system updates" is in the "In Progress" column & "Design" tag is displayed
    const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
    let found = false;

    const count = await columns.count();
    for (let i = 0; i < count; i++) {
        const column = columns.nth(i);
        if (await column.locator('h3:text("Design system updates")').isVisible()) {
            console.log('"Design system updates" is under the "In Progress" column');
            found = true;

            const designTag = column.locator('span:text("Design")');
            if (await designTag.isVisible()) {
                console.log('"Design" tag is displayed');
            } else {
                console.log('"Design" tag is not found');
            }
            break;
        }
    }

    if (!found) {
        console.log('Test failed: "Design system updates" not found in the "In Progress" column');
    }

})

// Test Case 4 - Mobile Application
test('Test Case 4', async ({ page }) => {

    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

    // Navigating to mobile application page
    await page.locator('h2.font-medium:text("Mobile Application")').click();

    // Making sure user is on mobile application page by printing out the header
    const headingText = await page.locator(locators.heading(testdata.expectedHeadingMobile)).textContent();
    console.log(headingText);

    // Verifying "Push notification system" is in the "To Do" column & "Feature" tag is displayed
    const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
    let found = false;

    const count = await columns.count();
    for (let i = 0; i < count; i++) {
        const column = columns.nth(i);
        if (await column.locator('h3:text("Push notification system")').isVisible()) {
            console.log('"Push notification system" is under the "To Do" column');
            found = true;

            // Verifying "Feature" tag is displayed
            const featureTag = column.locator('span:text("Feature")');
            if (await featureTag.isVisible()) {
                console.log('"Feature" tag is displayed');
            } else {
                console.log('"Feature" tag is not found');
            }
            break;
        }
    }

    if (!found) {
        console.log('Test failed: "Push notification system" not found in the "To Do" column');
    }
})

// Test Case 5 - Mobile Application
test('Test Case 5', async ({ page }) => {

    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

    // Navigating to mobile application page
    await page.locator('h2.font-medium:text("Mobile Application")').click();

    // Making sure user is on mobile application page by printing out the header
    const headingText = await page.locator(locators.heading(testdata.expectedHeadingMobile)).textContent();
    console.log(headingText);

    // Verifying "Offline mode" is in the "In Progress" column, "Feature" & "High Priority" tags are displayed
    const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
    let found = false;

    const count = await columns.count();
    for (let i = 0; i < count; i++) {
        const column = columns.nth(i);
        if (await column.locator('h3:text("Offline mode")').isVisible()) {
            console.log('"Offline mode" is under the "In Progress" column');
            found = true;

            // Verifying "Feature" and "High Priority" tags are displayed
            const featureTag = column.locator('span:text("Feature")');
            const highPriorityTag = column.locator('span:text("High Priority")');

            if (await featureTag.isVisible() && await highPriorityTag.isVisible()) {
                console.log('"Feature" and "High Priority" tags are displayed');
            } else {
                console.log('One or both tags are missing');
            }
            break;
        }
    }

    if (!found) {
        console.log('Test failed: "Offline mode" not found in the "In Progress" column');
    }

})

// Test Case 6 - Mobile Application
test('Test Case 6', async ({ page }) => {

    // Siging into the application
    await page.goto(testdata.url);
    await page.locator(locators.userName).fill(testdata.username);
    await page.locator(locators.userPassword).fill(testdata.password);
    await page.locator(locators.signInBtn).click();

   // Navigating to mobile application page
   await page.locator('h2.font-medium:text("Mobile Application")').click();

   // Making sure user is on mobile application page by printing out the header
   const headingText = await page.locator(locators.heading(testdata.expectedHeadingMobile)).textContent();
   console.log(headingText);

   // Verifying "App icon design" is in the "Done" column & Design tag is displayed
   const columns = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4');
   let found = false;

   const count = await columns.count();
   for (let i = 0; i < count; i++) {
       const column = columns.nth(i);
       if (await column.locator('h3:text("App icon design")').isVisible()) {
           console.log('"App icon design" is under the "Done" column');
           found = true;

           // Verifying "Design" tag is displayed
           const designTag = column.locator('span:text("Design")');
           if (await designTag.isVisible()) {
               console.log('"Design" tag is displayed');
           } else {
               console.log('"Design" tag is missing');
           }
           break;
       }
   }

   if (!found) {
       console.log('Test failed: "App icon design" not found in the "Done" column');
   }
})
