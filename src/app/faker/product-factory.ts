import { faker } from '@faker-js/faker';
import Product from '../models/Product';
import transformDate from './helper/transform-date';

function productFaker() {
    return {
        name: faker.commerce.productName(),
        barcode: `${faker.random.numeric(13)}`,
        buying_price: faker.random.numeric(12),
        selling_price: faker.random.numeric(12),
        minimum_stock: faker.random.numeric(2),
        has_expire_date: faker.datatype.boolean()? 1 : 0,
        unit_or_weight: faker.datatype.boolean()? 1 : 0,
        unit: faker.commerce.productMaterial(),
        // product_group_id: faker.random.numeric(12),
        // bigger_unit: faker.commerce.productMaterial(),
    }
}



// function generate 1000 products
function generateProducts(length: number = 1000) {
    let products = [];
    for (let i = 0; i < length; i++) {
        products.push(productFaker());
    }
    return products;
}


export function productFactory() {
    Product.insert(generateProducts(5000).map(product => new Product({ productForm: product })));
}