const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');
const usernames = require('../test-data/usernames');

test('Verify the Valid Users are able to login through each username', async ({ page }) => {
   const password = 'secret_sauce';
   const loginPage = new LoginPage(page);
   // Loop through each username in the array
   for (const username of usernames) {
   await loginPage.login(username, password);
        }
});

test('Verify the Invalid Users are not able to login through each username', async ({ page }) => {
const loginPage = new LoginPage(page);
const username = 'locked_out_user';
const password = 'secret_sauce';
await loginPage.login(username, password);
//error assertion
console.log(await page.locator('[data-test="error"]').textContent());
await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
await page.waitForLoadState('networkidle');
    
});

test('Verify the empty username and password shows client side validation error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const username = '';
        const password = '';
        await loginPage.login(username, password);
        //error assertion
        console.log(await page.locator('[data-test="error"]').textContent());
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
        await page.waitForLoadState('networkidle');
            
        });