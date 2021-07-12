import { expect } from "chai";
import { $, $$, browser, ElementFinder, ExpectedConditions } from "protractor";
import categories, { Product } from "./categories";

export class Price {
    private get priceSection() { return $('section[data-title="Price"]'); }

    private async filterBy(selector: string, amount: string) {
        const input = this.priceSection.$(selector);
        await browser.wait(ExpectedConditions.presenceOf(input),
            60000, `Could not located element by selector "${selector}"`);
        await input.clear();
        await input.sendKeys(amount);
    }

    private async verify(filteredProductsArray: Product[]) {
        const productsArr = $$('div.product-tile');
        await productsArr.each(async (product: ElementFinder | undefined, index: number | undefined) => {
            console.log('Index: ' + index);
            if (product && index) {
                expect(filteredProductsArray[index].price).to.eq(Number((await product.$('span[data-testid="component-price-regular"]').getText()).replace('€' , '')));
                expect(filteredProductsArray[index].manufacturer).to.eq(await product.$('div[class="p-r-x3 text-semibold"]').getText());
                expect(filteredProductsArray[index].name).to.eq(await product.$(`div[data-testid="product-tile-product-name-${await product.getAttribute('id')}"]`).getText());
            }
        })
    }

    public async filter(filterType: string, amount: string) {
        switch (filterType) {
            case 'min': await this.filterBy('input[id="currentPriceInCurrency.EUR-inputMin"]', amount); break;
            case 'max': await this.filterBy('input[id="currentPriceInCurrency.EUR-inputMax"]', amount); break;
            default: throw `Unsupported filter "${filterType}"`;
        }
        await this.priceSection.$('button.ais-RangeInput-submit').click();
    }

    public async filterByValueRange(min: string, max: string) {
        await this.filterBy('input[id="currentPriceInCurrency.EUR-inputMin"]', min);
        await this.filterBy('input[id="currentPriceInCurrency.EUR-inputMax"]', max);
        await this.priceSection.$('button.ais-RangeInput-submit').click();
    }

    public async verifyCorrectFilter(filterType: string, amount: number) {
        let filteredArray: Product[] = [];
        switch (filterType) {
            case 'min': filteredArray = categories.allProducts.filter((product) => product.price > amount); break;
            case 'max': filteredArray = categories.allProducts.filter((product) => product.price < amount); break;
            default: throw `Unsupported filter "${filterType}"`;
        }
        await this.verify(filteredArray);
    }

    public async verifyFilterWithinRange(min: number, max: number) {
        let filteredArray: Product[] = [];
        console.log(categories.allProducts);
        filteredArray = categories.allProducts.filter((product) => product.price > min && product.price < max);
        console.log(filteredArray);
        await this.verify(filteredArray);
    }
}

export default new Price();