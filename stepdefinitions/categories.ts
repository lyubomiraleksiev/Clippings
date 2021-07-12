import { Given } from "cucumber";
import { browser } from "protractor";

Given('I am at the light bulbs category page', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.baseUrl);
});