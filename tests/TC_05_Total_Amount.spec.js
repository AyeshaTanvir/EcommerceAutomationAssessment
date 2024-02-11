const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');
const CheckOutPage = require('../test-function/CheckOutPage');
const inputFieldSelectors = require('../test-data/checkoutstepone');

test('Calculate cart total items, amount, and tax', async ({ page }) => {
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

    // Continue to the next step
    await page.locator('[data-test="continue"]').click();

    // Extract cart items
    const cartItems = await page.$$('.cart_item');

    let totalQuantity = 0;
    let totalPrice = 0;

    // Iterate through each cart item
    for (const cartItem of cartItems) {
        const quantity = await cartItem.$eval('.cart_quantity', element => element.textContent);
        const price = await cartItem.$eval('.inventory_item_price', element => element.textContent);

        // Remove the dollar sign and convert price to float
        const itemPrice = parseFloat(price.replace('$', ''));

        // Parse quantity to integer
        const itemQuantity = parseInt(quantity);

        // Update total quantity and price
        totalQuantity += itemQuantity;
        totalPrice += itemPrice * itemQuantity;
    }

    // Extract the tax amount displayed on the page
    const tax = await page.$eval('.summary_tax_label', element => {
        const taxText = element.textContent;
        return parseFloat(taxText.replace('Tax: $', ''));
    });

    // Extract the total amount displayed on the page
    const displayedTotal = await page.$eval('.summary_total_label', element => {
        const totalText = element.textContent;
        return parseFloat(totalText.replace('Total: $', ''));
    });

    // Calculate the expected total by adding tax to the total price
    const expectedTotal = totalPrice + tax;
    const expectedTotalString = expectedTotal.toFixed(2);
    const displayedTotalString = displayedTotal.toFixed(2);
    // Compare the calculated total with the displayed total
// Compare the calculated total with the displayed total
expect(displayedTotalString).toBe(expectedTotalString); // Ensure they match
});