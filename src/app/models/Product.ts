import Model from './Model';
interface ProductDB {
    id: number;
    name: string;
    barcode: string;
    buying_price: number;
    selling_price: number;
    minimum_stock: number;
    has_expire_date: boolean;
    unit_or_weight: boolean;
    unit: string;
    product_group_id: number;
    bigger_unit_id: number;
}

export default class Product extends Model {
    id?: number;
    name: string;
    barcode: string;
    buying_price: number;
    selling_price: number;
    minimum_stock: number;
    has_expire_date: boolean;
    unit_or_weight: boolean;
    unit: string;
    product_group_id: number;
    bigger_unit_id: number;

    tableName = 'products';
    static getTableName(): string {
        return 'products';
    }
    constructor({ productDB, productForm }: { productDB?: ProductDB, productForm?: any }) {
        super();
        if (productForm) {
            this.name = productForm.name;
            this.barcode = productForm.barcode;
            this.buying_price = productForm.buying_price;
            this.selling_price = productForm.selling_price;
            this.minimum_stock = productForm.minimum_stock;
            this.has_expire_date = productForm.has_expire_date;
            this.unit_or_weight = productForm.unit_or_weight;
            this.unit = productForm.unit;
            this.product_group_id = productForm.product_group_id;
            this.bigger_unit_id = productForm.bigger_unit_id;
        } else {
            if (!productDB) throw new Error('productDB is null');
            this.id = productDB.id;
            this.name = productDB.name;
            this.barcode = productDB.barcode;
            this.buying_price = productDB.buying_price;
            this.selling_price = productDB.selling_price;
            this.minimum_stock = productDB.minimum_stock;
            this.has_expire_date = productDB.has_expire_date;
            this.unit_or_weight = productDB.unit_or_weight;
            this.unit = productDB.unit;
            this.product_group_id = productDB.product_group_id;
            this.bigger_unit_id = productDB.bigger_unit_id;
        }
    }
    toDB(): { [key: string]: any } {
        // TODO: implement
        return { name: this.name, barcode: this.barcode, buying_price: this.buying_price, selling_price: this.selling_price, minimum_stock: this.minimum_stock, has_expire_date: this.has_expire_date, unit_or_weight: this.unit_or_weight, unit: this.unit, product_group_id: this.product_group_id, bigger_unit_id: this.bigger_unit_id };
    }
    toForm(): any {
        // TODO: implement
        return { name: this.name, barcode: this.barcode, buying_price: this.buying_price, selling_price: this.selling_price, minimum_stock: this.minimum_stock, has_expire_date: this.has_expire_date, unit_or_weight: this.unit_or_weight, unit: this.unit, product_group_id: this.product_group_id, bigger_unit_id: this.bigger_unit_id };
    }
}
