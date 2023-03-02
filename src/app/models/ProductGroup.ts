import { DatabaseResult } from "../config/database";
import Model from "./Model";

export default class ProductGroup extends Model {
  id?: number;
  name: string | null = null;
  productsCount: number | null = null;
  tableName = "product_groups";
  static getTableName(): string {
    return "product_groups";
  }
  constructor({
    productGroupDB,
    productGroupForm,
  }: {
    productGroupDB?: DatabaseResult;
    productGroupForm?: any;
  }) {
    super();
    if (productGroupForm) {
      this.assign(productGroupForm);
    } else {
      if (!productGroupDB) throw new Error("productGroupDB is null");
      this.id = productGroupDB.id;
      this.assign(productGroupDB);
    }
  }
  assign(obj: any) {
    this.name = obj.name;
    // relations
    this.productsCount = obj.count;
  }
  toDB(): { [key: string]: any } {
    // TODO: implement
    return { id: this.id, name: this.name };
  }
  toForm(): any {
    // TODO: implement
    return { id: this.id, name: this.name };
  }
}
