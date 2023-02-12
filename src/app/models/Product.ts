import Model from './Model';
export interface ProductDB {
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
    created_at: string;
}

export default class Product extends Model {
    id?: number;
    name: string | null = null;
    barcode: string | null = null;
    buying_price: number | null = null;
    selling_price: number | null = null;
    minimum_stock: number | null = null;
    has_expire_date: boolean | null = null;
    unit_or_weight: boolean | null = null;
    unit: string | null = null;
    product_group_id: number | null = null;
    bigger_unit_id: number | null = null;
    created_at: string | null = null;
    tableName = 'products';
    static getTableName(): string {
        return 'products';
    }
    constructor({ productDB, productForm }: { productDB?: ProductDB, productForm?: any }) {
        super();
        if (productForm) {
            this.assign(productForm);
        } else {
            if (!productDB) throw new Error('productDB is null');
            this.id = productDB.id;
            this.assign(productDB);
        }
    }
    assign(obj: any) {
        this.name = obj.name;
        this.barcode = obj.barcode;
        this.buying_price = obj.buying_price;
        this.selling_price = obj.selling_price;
        this.minimum_stock = obj.minimum_stock;
        this.has_expire_date = obj.has_expire_date;
        this.unit_or_weight = obj.unit_or_weight;
        this.unit = obj.unit;
        this.product_group_id = obj.product_group_id;
        this.bigger_unit_id = obj.bigger_unit_id;
    }
    toDB(): { [key: string]: any } {
        // TODO: implement
        return { id: this.id, name: this.name, barcode: this.barcode, buying_price: this.buying_price, selling_price: this.selling_price, minimum_stock: this.minimum_stock, has_expire_date: this.has_expire_date, unit_or_weight: this.unit_or_weight, unit: this.unit, product_group_id: this.product_group_id, bigger_unit_id: this.bigger_unit_id };
    }
    toForm(): any {
        // TODO: implement
        return { id: this.id, name: this.name, barcode: this.barcode, buying_price: this.buying_price, selling_price: this.selling_price, minimum_stock: this.minimum_stock, has_expire_date: this.has_expire_date, unit_or_weight: this.unit_or_weight, unit: this.unit, product_group_id: this.product_group_id, bigger_unit_id: this.bigger_unit_id };
    }
}
