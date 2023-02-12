import { TableParams } from "../config/interfaces";
import Product, { ProductDB } from "../models/Product";

export default class ProductService {
    static async chunk(tableParams: TableParams, sortDB: string, where?: string) {
        const data = await Product.chunck(['*'], tableParams.pagination?.pageSize!, tableParams.pagination?.current!, where, sortDB) as ProductDB[];
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