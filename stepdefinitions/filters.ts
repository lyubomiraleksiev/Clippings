import { Then, When } from "cucumber";
import categories from "../pages/categories";
import minMax from "../pages/min-max";

When(/^I filter by (min|max) amount '(.*)'$/, async (filterType: string, amount: string) => {
    await minMax.filter(filterType, amount);
});

When('I filter by {string} min and {string} max amount', async (min: string, max: string) => {
    await minMax.filterByValueRange(min, max);
});

When('I store all visible products', async () => {
    await categories.storeAllProducts();
});

Then(/^only products within '(.*)' (min|max) range are visible$/, async (amount: string, filterType: string) => {
    await minMax.verifyCorrectFilter(filterType, Number(amount));
});

Then('only products within {string} min and {string} max ranges are visible', async (minAmount: string, maxAmount: string) => {
    await minMax.verifyFilterWithinRange(Number(minAmount), Number(maxAmount));
});