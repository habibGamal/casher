import { message } from "antd";
import { dbPromise } from "../config/database";
import { QueryResult } from "tauri-plugin-sql-api";
import { Errors } from "../config/interfaces";

export default abstract class Model {
    abstract tableName: string;
    static getTableName() {
        throw new Error('Not implemented');
    }
    abstract toDB(): { [key: string]: any };
    abstract toForm(): any;
    abstract assign(obj: any): void;
    private static async executeQuery(sql: string): Promise<QueryResult | Errors | undefined> {
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected > 0 ? console.log('success') : console.log('fail');
            return queryResult;
        } catch (error) {
            if ((error as string).includes('Duplicate entry')) {
                // execlude property name from this string `error returned from database: 1062 (23000): Duplicate entry '001245' for key 'products.barcode'`
                const catchAfterKey = (error as string).split('key ')[1];
                const fieldPath = catchAfterKey.split('\'')[1];
                // get property name from field path
                const property = fieldPath.split('.')[1];
                console.log(property,fieldPath);
                
                return { errors: [{ property, message: 'يجب ان تكون هذه القيمة غير مستخدمة من قبل' }] } as Errors;
            }
            console.log(error);
            message.error('Error check console log');
        }
    }

    private static async selectQuery(sql: string) {
        console.log(sql);
        try {
            const db = await dbPromise;
            // measure the performance of this query
            const start = performance.now();
            const queryResult = await db.select(sql);
            const end = performance.now();
            console.log(`Query took ${end - start} ms`);
            return queryResult;
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }

    async create() {
        // get data
        const data = this.toDB()
        // remove any undefined value
        for (let key in data) {
            if (data[key] === undefined || data[key] === null) {
                delete data[key];
            }
        }
        delete data.id;
        // create sql query
        let sql = `INSERT INTO ${this.tableName}`;
        const keys = Object.keys(data);
        const values = Object.values(data);
        // round values with single quote
        for (let i = 0; i < values.length; i++) {
            values[i] = `'${values[i]}'`;
        }
        sql += ` (${keys.join(', ')}) VALUES (${values.join(', ')})`;
        return await Model.executeQuery(sql);
    }
    static async insert(models: Model[]) {
        const data = models.map(model => model.toDB());
        // remove any undefined value
        for (let row of data) {
            for (let key in row) {
                if (row[key] === undefined || row[key] === null) {
                    delete row[key];
                }
            }
        }
        data.forEach(row => delete row.id);
        let sql = `INSERT INTO ${this.getTableName()}`;
        const keys = Object.keys(data[0]);
        sql += ` (${keys.join(', ')}) VALUES `;
        const values = data.map((row) => {
            // round values with single quote
            for (let key in row) {
                row[key] = `'${row[key]}'`;
            }
            return `(${Object.values(row).join(', ')})`;
        });
        sql += values.join(', ');
        return await Model.executeQuery(sql);
    }
    static async all(cols: string[] = ['*'], orderBy?: string) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        if (orderBy)
            sql += ` ORDER BY ${orderBy}`;
        return await Model.selectQuery(sql);
    }
    static async select(cols: string[], where?: string) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        if (where)
            sql += ` WHERE ${where}`;

        return await Model.selectQuery(sql);
    }
    static async chunck(cols: string[], rate: number, currentPage: number, where?: string, orderBy?: string) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        if (where)
            sql += ` WHERE ${where}`;
        if (orderBy)
            sql += ` ORDER BY ${orderBy}`;
        sql += ` LIMIT ${rate} OFFSET ${rate * (currentPage - 1)}`;
        return await Model.selectQuery(sql);
    }
    static async count(where?: string) {
        let sql = `SELECT COUNT(*) as count FROM ${this.getTableName()}`;
        if (where)
            sql += ` WHERE ${where}`;
        const countPromise = await Model.selectQuery(sql) as [{ 'count': number }];
        return countPromise[0].count;
    }
    static async find(id: number) {
        const sql = `SELECT * FROM ${this.getTableName()} WHERE id = ${id}`;
        return await Model.selectQuery(sql);
    }
    async save() {
        const data = this.toDB();
        const id = data.id;
        delete data.id;
        // remove any undefined value
        for (let key in data) {
            if (data[key] === undefined || data[key] === null) {
                delete data[key];
            }
        }
        // replace any false value with 0 and true value with 1
        for (let key in data) {
            if (data[key] === false) {
                data[key] = 0;
            }
            if (data[key] === true) {
                data[key] = 1;
            }
        }
        let sql = `UPDATE ${this.tableName} SET `;
        const keys = Object.keys(data);
        const values = Object.values(data);
        sql += `${keys[0]} = '${values[0]}'`;
        for (let i = 1; i < keys.length; i++) {
            sql += `, ${keys[i]} = '${values[i]}'`;
        }
        sql += ` WHERE id = ${id}`;
        return await Model.executeQuery(sql);
    }
    static async update(models: Model[], data: { [key: string]: any }) {
        const ids = models.map(model => model.toDB().id);
        let sql = `UPDATE ${this.getTableName()} SET `;
        const keys = Object.keys(data);
        const values = Object.values(data);
        for (let i = 0; i < values.length; i++) {
            if (values[i] === undefined || values[i] === null) {
                keys.splice(i, 1);
                values.splice(i, 1);
            }
        }
        sql += `${keys[0]} = ${values[0]}`;
        for (let i = 1; i < keys.length; i++) {
            sql += `, ${keys[i]} = '${values[i]}'`;
        }
        sql += ` WHERE id IN (${ids.join(', ')})`;

        return await Model.executeQuery(sql);
    }
    async delete() {
        const id = this.toDB().id;
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

        return await Model.executeQuery(sql);
    }
    static async delete(models: Model[]) {
        const ids = models.map(model => model.toDB().id);
        const sql = `DELETE FROM ${this.getTableName()} WHERE id IN (${ids.join(', ')})`;

        return await Model.executeQuery(sql);
    }
}