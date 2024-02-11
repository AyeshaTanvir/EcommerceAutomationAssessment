Postman API Automation with Newman

This repository contains automated tests for your API endpoints using Postman and Newman. The tests include checking the status code, response time, total product pages, data types, and validating product data. The tests are executed using the Postman Collection Runner and Newman report execution through CMD.

Prerequisites
Postman: Ensure that you have Postman installed on your system. You can download it from postman.com.

Node.js and npm: Make sure you have Node.js and npm installed on your system. You can download and install them from nodejs.org.

Installation
Clone the repository:

git clone https://github.com/AyeshaTanvir/EcommerceAutomationAssessment

Install Newman globally:

npm install -g newman
To check it's successfully installed write newman --v

Running the Tests Through Postman:
1. Go to Postman and do run collection and run the collection through postman

Run the tests using Newman:
1. Open your terminal or command prompt and navigate to the project directory where the repost.json file is located.
2. Write newman run report.json

This command executes the tests defined in the Postman collection using Newman and generates a report.json file with the test results.

Viewing the Test Report
After running the tests with Newman, you can view the test report generated in JSON format (report.json). This report contains detailed information about the test runs, including status codes, response times, and test results.

Troubleshooting
If you encounter any issues while running the tests or generating the report, ensure that:

Postman collection and environment variables are correctly configured.
API endpoints are accessible and responsive.
Newman is installed globally and the command is executed from the correct directory.
Contributing
Feel free to contribute to this repository by opening issues or submitting pull requests.
Your contributions are highly appreciated!

Author:
Syeda Ayesha Tanvir