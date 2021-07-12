import { $$, ElementFinder } from "protractor";

export interface Product {
    manufacturer: string, 
    name: string, 
    price: number
}

export class Categories {
    public allProducts: Product[] = [];

    public async storeAllProducts() {
        const productsArr = $$('div.product-tile');
        await productsArr.each(async (product: ElementFinder | undefined, index: number | undefined) => {
            if (product && index) {
                const productId = await product.getAttribute('id');
                let price = (await product.$('span[data-testid="component-price-regular"]').getText()).replace('€' , '');
                this.allProducts.push({
                    manufacturer: await product.$('div[class="p-r-x3 text-semibold"]').getText(),
                    name: await product.$(`div[data-testid="product-tile-product-name-${productId}"]`).getText(),
                    price: Number(price)
                });
            }
        });
    }
}

export default new Categories();