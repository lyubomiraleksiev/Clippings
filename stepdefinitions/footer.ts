import { Given } from "cucumber";
import footer from "../pages/footer";

Given('I change currency to {string}', async (curr: string) => {
    await footer.changeCurrency(curr);
});

Given('I change accept lead times update popover', async () => {
    await footer.acceptLeadTimesPopover();
});