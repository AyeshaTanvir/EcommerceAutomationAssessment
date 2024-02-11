const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');
const usernames = require('../test-data/usernames');

test('Verify all the items in the inventory are added to cart successfully', async ({ page }) => {
   const username = 'standard_user'
   const password = 'secret_sauce';
   const loginPage = new LoginPage(page);
   await loginPage.login(username, password);
         // Navigate to the page
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Define selectors for product elements
    const addToCartButtonsSelector = '.btn_inventory'; // Selector for add to cart buttons

    // Find all add to cart buttons
    const addToCartButtons = await page.$$(addToCartButtonsSelector);

    // Iterate through each button and click
    for (const button of addToCartButtons) {
        await button.click();
        // Ensure there are elements present for each selector
        expect(addToCartButtons.length).toBeGreaterThan(0);
    }

    // Wait for the cart count to be updated
    await page.waitForSelector('.shopping_cart_link');

    // Get the number of items in the cart
    const cartCount = await page.textContent('.shopping_cart_link');

    // Expect that the cart count matches the number of items added
    expect(parseInt(cartCount)).toBe(addToCartButtons.length);    
});