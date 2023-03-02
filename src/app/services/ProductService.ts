import { DatabaseResult } from "../config/database";
import { TableParams } from "../config/interfaces";
import Product from "../models/Product";
import ProductGroup from "../models/ProductGroup";

export default class ProductService {
  static joinProductsWithProductGroupName(
    cols: string[] = [
      `${ProductGroup.getTableName()}.name as product_group_name`,
    ]
  ) {
    return {
      joinSelect: cols,
      joinStatment: `LEFT JOIN ${ProductGroup.getTableName()} ON ${Product.getTableName()}.product_group_id = ${ProductGroup.getTableName()}.id`,
    };
  }

  static async chunk(tableParams: TableParams, sortDB?: string, where?: string) {
    const { joinSelect, joinStatment } = this.joinProductsWithProductGroupName();
    const data = (await Product.chunkWithJoin(
      ["*"],
      tableParams.pagination?.pageSize!,
      tableParams.pagination?.current!,
      joinSelect,
      joinStatment,
      where,
      sortDB
    )) as DatabaseResult[];
    const count = await Product.count(where);
    const products = data.map((productDB) => new Product({ productDB }));
    return { products, count };
  }

  static async createProduct(values: any) {
    const product = new Product({ productForm: values });
    return await product.create();
  }

  static async updateProduct(modelToEdit: Product, values: any) {
    const product = modelToEdit;
    product.assign(values);
    return await product.save();
  }
}
