import { faker } from "@faker-js/faker";
import ProductGroup from "../models/ProductGroup";
function productGroupFaker() {
  return {
    name: faker.commerce.productName(),
  };
}

// function generate 1000 products
function generateProductGroups(length: number = 1000) {
  let models = [];
  for (let i = 0; i < length; i++) {
    models.push(productGroupFaker());
  }
  return models;
}

export async function productGroupFactory() {
  await ProductGroup.insert(
    generateProductGroups(100).map(
      (productGroup) => new ProductGroup({ productGroupForm: productGroup })
    )
  );
}
