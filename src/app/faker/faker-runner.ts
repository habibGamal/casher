import { productFactory } from "./product-factory";
import { productGroupFactory } from "./product-group-factory";
export default async function fakerRunner() {
  await productGroupFactory();
  await productFactory();
}
