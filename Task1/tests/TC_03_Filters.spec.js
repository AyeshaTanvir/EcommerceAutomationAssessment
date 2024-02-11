const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');

test('Test inventory page filters', async ({ page }) => {
    const username = 'standard_user'
    const password = 'secret_sauce';
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    // Navigate to the inventory page
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Define the selector for the filter dropdown
    const filterDropdownSelector = '.product_sort_container';
    // Define the options for filter selection
    const filterOptions = ['az', 'za', 'lohi', 'hilo'];

    // Iterate through each filter option
    for (const option of filterOptions) {
        // Select the filter option
        await page.selectOption(filterDropdownSelector, option);

        // Wait for the products to be sorted based on the selected option
        await page.waitForTimeout(1000); // Adjust timeout as necessary

        // Get the list of product names
        const productNames = await page.$$eval('.inventory_item_name', elements =>
            elements.map(element => element.textContent.trim())
        );

        // Check if the products are sorted correctly based on the selected filter option
        switch (option) {
            case 'az':
                expect(productNames).toEqual(productNames.slice().sort());
                break;
            case 'za':
                expect(productNames).toEqual(productNames.slice().sort().reverse());
                break;
            case 'lohi':
                expect(productNames).toEqual(productNames.slice().sort((a, b) => parseFloat(a) - parseFloat(b)));
                break;
            case 'hilo':
                expect(productNames).toEqual(productNames.slice().sort((a, b) => parseFloat(b) - parseFloat(a)));
                break;
            default:
                throw new Error('Invalid filter option');
        }
    }
});