const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');
const CheckOutPage = require('../test-function/CheckOutPage');
const inputFieldSelectors = require('../test-data/checkoutstepone');

test('Verify the purchase flow of all items in the cart is done successfully', async ({ page }) => {
    const username = 'standard_user'
    const password = 'secret_sauce';
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    // Navigate to the inventory page
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Define selectors for product elements
    const addToCartButtonsSelector = '.btn_inventory';

    // Find all add to cart buttons
    const addToCartButtons = await page.$$(addToCartButtonsSelector);

    // Iterate through each button and click
    for (const button of addToCartButtons) {
        await button.click();
    }

    // Wait for the cart count to be updated
    await page.waitForSelector('.shopping_cart_link');

    // Get the number of items in the cart
    const cartCount = await page.textContent('.shopping_cart_link');

    // Expect that the cart count matches the number of items added
    expect(parseInt(cartCount)).toBe(addToCartButtons.length);  

    // Navigate to the cart page
    await page.goto("https://www.saucedemo.com/cart.html");
    await page.click('#checkout');

    // Create an instance of CheckOutPage
    const checkoutPage = new CheckOutPage(page);

    // Perform checkout
    await checkoutPage.checkout('Ayesha', 'Tanvir', '12345');

    // Iterate over input fields and validate
    for (const selector of inputFieldSelectors) {
        const inputField = await page.$(selector);

        // Ensure the input field is present
        expect(inputField).not.toBeNull();

        // Get the value of the input field
        const value = await inputField.getAttribute('value');

        // Ensure the input field is not empty
        expect(value).toBeTruthy();
    }
        await page.locator('[data-test="continue"]').click();
        await page.click('#finish');
        await page.click('#back-to-products');
        await page.pause();
    
});

test('Verify the empty user details does not let user checkout and shows error', async ({ page }) => {
    const username = 'standard_user';
    const password = 'secret_sauce';
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    // Navigate to the inventory page
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Define selectors for product elements
    const addToCartButtonsSelector = '.btn_inventory';

    // Find all add to cart buttons
    const addToCartButtons = await page.$$(addToCartButtonsSelector);

    // Iterate through each button and click
    for (const button of addToCartButtons) {
        await button.click();
    }

    // Wait for the cart count to be updated
    await page.waitForSelector('.shopping_cart_link');

    // Get the number of items in the cart
    const cartCount = await page.textContent('.shopping_cart_link');

    // Expect that the cart count matches the number of items added
    expect(parseInt(cartCount)).toBe(addToCartButtons.length);  

    // Navigate to the cart page
    await page.goto("https://www.saucedemo.com/cart.html");
    await page.click('#checkout');

    // Create an instance of CheckOutPage
    const checkoutPage = new CheckOutPage(page);

    // Perform checkout with empty user details
    await checkoutPage.checkout('', '', '');

    await page.locator('[data-test="continue"]').click();

    // Wait for the error message to appear
    await page.waitForSelector('[data-test="error"]');

    // Get the text content of the error message
    const errorMessage = await page.textContent('[data-test="error"]');

    // Assert that the error message contains the expected text
    expect(errorMessage).toContain('Error: First Name is required');
});