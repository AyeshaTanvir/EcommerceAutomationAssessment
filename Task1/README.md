--This code is written by Syeda Ayesha Tanvir @copyrights

**Playwright Automation Testing**

This repository contains automated tests for the Sauce Demo web application using Playwright.
The tests cover various scenarios such as login, navigation, cart functionality, and error handling.

**Project Structure**
The project structure is organized as follows:

test-data: Contains data files used in the tests.
test-function: Contains reusable functions and page objects used across tests.
tests: Contains the actual test scripts.
playwright-report: Contains the generated test reports.

**Setup**
1. Clone this repository to your local machine.
2. Ensure you have Node.js and npm installed.
3. Install project dependencies by running npm install.

**Running Tests**
To execute the tests, use the following command:
npx playwright test

By default, the tests will run in both Chrome and WebKit browsers. The test results will be saved in the playwright-report folder with the name index.html.
You can also specify specific browsers or configurations by modifying the config object in the playwright.config.js file.

**Test Files**
The test files are under the tests folder named
TC_01_Login.spec.js, TC_02_Inventory_Page.spec, TC_03_Filters.spec, TC_04_Add_To_Cart.spec, TC_05_Total_Amount.spec, TC_06_CheckOut.spec, TC_07_Menu_Navigation.spec

**Author**
Syeda Ayesha Tanvir 
