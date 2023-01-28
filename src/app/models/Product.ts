import Model from './Model';
interface ProductDB {
    id: number;
    name: string;
    price: number;
    date: string;
}

class Product extends Model {
    id?: number;
    name: string;
    price: number;
    date: string;
    tableName = 'products';
    static getTableName(): string {
        return 'products';
    }
    constructor({ productDB, productForm }: { productDB?: ProductDB, productForm?: any }) {
        super();
        if (productForm) {
            this.name = productForm.name;
            this.price = productForm.price;
            this.date = productForm.date;
        } else {
            if (!productDB) throw new Error('productDB is null');
            this.id = productDB.id;
            this.name = productDB.name;
            this.price = productDB.price;
            this.date = productDB.date;
        }
    }
    toDB(): { [key: string]: any } {
        // TODO: implement
        return { id: this.id, name: this.name, price: this.price, date: this.date };
    }
    toForm(): any {
        // TODO: implement
        return { name: this.name, price: this.price, date: this.date };
    }
}
