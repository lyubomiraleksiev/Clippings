import { $, browser, ExpectedConditions } from "protractor";
import { sleep } from "../support/timeHelper";

export class Footer {
    public async acceptLeadTimesPopover() {
        const popoverButton = $('div.putinbay-c-bravo.Campaign__bravoLayer').$('button[value="Close"]');
        await browser.wait(ExpectedConditions.elementToBeClickable(popoverButton),
            60000, `Could not located currency dropdown`);
        await sleep(1000)
        await popoverButton.click();
    }

    public async changeCurrency(currency: string) {
        const dropdown = $('div#mui-component-select-currency');
        await browser.wait(ExpectedConditions.elementToBeClickable(dropdown),
            60000, `Could not located currency dropdown`);
        await dropdown.click();
        await $(`li[data-value="${currency}"]`).click();
    }
}

export default new Footer();