class CheckOutPage {
    constructor(page) {
        this.page = page;
    }

    async checkout(firstName, lastName, postalCode) {
        await this.page.waitForLoadState('networkidle');
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
    }
}

module.exports = CheckOutPage;