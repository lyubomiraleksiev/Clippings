import { BeforeAll, After, Status, setDefaultTimeout, Before } from "cucumber";
import { browser } from "protractor";

BeforeAll(async function () {
    setDefaultTimeout(browser.params.cucumberSetDefaultTimeout);
});

Before({tags: "@NewTab"}, async function () {
    let handles = await browser.getAllWindowHandles();
    const winNum = handles.length;
    this.initialWindowNumber = winNum;
    this.initialWidnowHandle = await browser.getWindowHandle()
});

let failedRetries = new Map();

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenShot = await browser.takeScreenshot();
        this.attach(screenShot, "image/png");
    }
});

After({tags: "@NewTab"}, async function () {
    let handles = await browser.getAllWindowHandles();
    handles.forEach(async handle => {
        if (handle != this.initialWidnowHandle) {
            await browser.switchTo().window(handle);
            await browser.close()
        }
    });
    await browser.switchTo().window(this.initialWidnowHandle)
});
