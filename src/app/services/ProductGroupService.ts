import { DatabaseResult } from "../config/database";
import { TableParams } from "../config/interfaces";
import Product from "../models/Product";
import ProductGroup from "../models/ProductGroup";
const productTN = Product.getTableName();
const productGroupTN = ProductGroup.getTableName();
export default class ProductGroupService {
  static joinProductGroupsWithProductsCount() {
    return {
      joinSelect: [`count(${productTN}.id) as count`],
      joinStatment: `LEFT JOIN ${productTN} ON ${productGroupTN}.id = ${productTN}.product_group_id GROUP BY id , name`,
    };
  }

  static joinProductsInProductGroup() {
    return {
      joinSelect: [`${productTN}.id ,${productTN}.name , ${productTN}.barcode`],
      joinStatment: `LEFT JOIN ${productTN} ON ${productGroupTN}.id = ${productTN}.product_group_id`,
    };
  }

  static async getProductGroupsWithProductsCount(
    tableParams: TableParams,
    sortDB?: string,
    where?: string
  ) {
    const { joinSelect, joinStatment } =
      this.joinProductGroupsWithProductsCount();
    const data = (await ProductGroup.chunkWithJoin(
      ["*"],
      tableParams.pagination?.pageSize!,
      tableParams.pagination?.current!,
      joinSelect,
      joinStatment,
      where,
      sortDB
    )) as DatabaseResult[];
    console.log(data);

    const count = await ProductGroup.count(where);
    const productGroups = data.map(
      (productGroupDB) => new ProductGroup({ productGroupDB })
    );
    return { productGroups, count };
  }

  static async getProductsInProductGroup(
    tableParams: TableParams,
    sortDB?: string,
    where?: string
  ) {
    const { joinSelect, joinStatment } =
      this.joinProductsInProductGroup();
    const data = (await ProductGroup.chunkWithJoin(
      ["*"],
      tableParams.pagination?.pageSize!,
      tableParams.pagination?.current!,
      joinSelect,
      joinStatment,
      where,
      sortDB
    )) as DatabaseResult[];
    console.log(data);

    const count = await ProductGroup.count(where);
    const products = data.map(
      (productDB) => new Product({ productDB })
    );
    return { products, count };
  }
  static async createProduct(values: any) {
    const productGroup = new ProductGroup({ productGroupForm: values });
    return await productGroup.create();
  }

  static async updateProduct(modelToEdit: ProductGroup, values: any) {
    const productGroup = modelToEdit;
    productGroup.assign(values);
    return await productGroup.save();
  }
}
