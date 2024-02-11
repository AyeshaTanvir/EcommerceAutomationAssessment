const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');

test('Verify the products name, price and inventory is not empty', async ({ page }) => {
   const username = 'standard_user'
   const password = 'secret_sauce';
   const loginPage = new LoginPage(page);
   await loginPage.login(username, password);
         // Navigate to the page
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Define selectors for product elements
    const productSelectors = [
        '.inventory_item_name', // Selector for product names
        '.inventory_item_price', // Selector for product prices
        '.btn_inventory' // Selector for add to cart buttons
    ];

    // Iterate over product elements and validate
    for (const selector of productSelectors) {
        const elements = await page.$$(selector);

        // Ensure there are elements present for each selector
        expect(elements.length).toBeGreaterThan(0);

        // Log the text content of each element
        const texts = await Promise.all(elements.map(element => element.textContent()));

        // Ensure text content is not empty
        expect(texts.filter(text => text.trim() !== '')).not.toHaveLength(0);
    }
});