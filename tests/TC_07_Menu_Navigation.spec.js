const { test, expect } = require('@playwright/test');
const LoginPage = require('../test-function/LoginPage');

test('Verify test navigation for all menu items', async ({ page }) => {
    const username = 'standard_user';
    const password = 'secret_sauce';
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

  // Navigate to the page
await page.goto("https://www.saucedemo.com/inventory.html");

// Open the menu
const menuButton = await page.waitForSelector('#react-burger-menu-btn', { visible: true });
await menuButton.click();

// Wait for the menu to open
await page.waitForSelector('.bm-menu');

// Click on the "All Items" menu item
const allItemsMenuItem = await page.$('.bm-item:has-text("All Items")');
await allItemsMenuItem.click();
 expect(page.url()).toContain('https://www.saucedemo.com/inventory.html');
await page.waitForSelector('.bm-menu');

// Click on the "Reset App State" menu item
const resetMenuItem = await page.$('.bm-item:has-text("Reset App State")');
await resetMenuItem.click();
expect(page.url()).toContain('https://www.saucedemo.com/inventory.html');

// Click on the "Logout" menu item
const logoutMenuItem = await page.$('.bm-item:has-text("Logout")');
await logoutMenuItem.click();
expect(page.url()).toContain('https://www.saucedemo.com/');
await page.waitForLoadState('networkidle');
await loginPage.login(username, password);
await page.waitForLoadState('networkidle');
// Open the menu
(await page.waitForSelector('#react-burger-menu-btn', { visible: true })).click();
// Click on the "About" menu item
const aboutMenuItem = await page.$('.bm-item:has-text("About")');
await aboutMenuItem.click();
expect(page.url()).toContain('https://saucelabs.com/');
});