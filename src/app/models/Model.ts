import { message } from "antd";
import { dbPromise } from "../config/database";

export default abstract class Model {
    abstract tableName: string;
    static getTableName() {
        throw new Error('Not implemented');
    }
    abstract toDB(): { [key: string]: any };
    abstract toForm(): any;
    async create() {
        // get data
        const data = this.toDB()
        delete data.id;
        // create sql query
        let sql = `INSERT INTO ${this.tableName}`;
        const keys = Object.keys(data);
        const values = Object.values(data);
        sql += ` (${keys.join(', ')}) VALUES (${values.join(', ')})`;
        // try to execute query
        try {
            // connect to database
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected > 0 ? console.log('success') : console.log('fail');
        } catch (error) {
            // catch error
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async insert(models: Model[]) {
        const data = models.map(model => model.toDB());
        data.forEach(row => delete row.id);
        let sql = `INSERT INTO ${this.getTableName()}`;
        const keys = Object.keys(data[0]);
        sql += ` (${keys.join(', ')}) VALUES `;
        const values = data.map((row) => {
            return `(${Object.values(row).join(', ')})`;
        });
        sql += values.join(', ');
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected === models.length ? console.log('success') : console.log('fail');
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async all(cols: string[] = ['*']) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        try {
            const db = await dbPromise;
            const queryResult = await db.select(sql);
            return queryResult;
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async select(cols: string[], where?: string) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        if (where)
            sql += ` WHERE ${where}`;
        try {
            const db = await dbPromise;
            const queryResult = await db.select(sql);
            return queryResult;
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async chunck(cols: string[], rate: number, currentPage: number, where?: string) {
        let sql = `SELECT ${cols.join(', ')} FROM ${this.getTableName()}`;
        if (where)
            sql += ` WHERE ${where}`;
        sql += ` LIMIT ${rate} OFFSET ${rate * (currentPage - 1)}`;
        try {
            const db = await dbPromise;
            const queryResult = await db.select(sql);
            return queryResult;
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }

    async save() {
        const data = this.toDB();
        const id = data.id;
        delete data.id;
        let sql = `UPDATE ${this.tableName} SET `;
        const keys = Object.keys(data);
        const values = Object.values(data);
        sql += `${keys[0]} = ${values[0]}`;
        for (let i = 1; i < keys.length; i++) {
            sql += `, ${keys[i]} = ${values[i]}`;
        }
        sql += ` WHERE id = ${id}`;
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected > 0 ? console.log('success') : console.log('fail');
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async update(models: Model[], data: { [key: string]: any }) {
        const ids = models.map(model => model.toDB().id);
        let sql = `UPDATE ${this.getTableName()} SET `;
        const keys = Object.keys(data);
        const values = Object.values(data);
        sql += `${keys[0]} = ${values[0]}`;
        for (let i = 1; i < keys.length; i++) {
            sql += `, ${keys[i]} = ${values[i]}`;
        }
        sql += ` WHERE id IN (${ids.join(', ')})`;
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected === models.length ? console.log('success') : console.log('fail');
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    async delete() {
        const id = this.toDB().id;
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected > 0 ? console.log('success') : console.log('fail');
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
    static async delete(models: Model[]) {
        const ids = models.map(model => model.toDB().id);
        const sql = `DELETE FROM ${this.getTableName()} WHERE id IN (${ids.join(', ')})`;
        try {
            const db = await dbPromise;
            const queryResult = await db.execute(sql);
            queryResult.rowsAffected === models.length ? console.log('success') : console.log('fail');
        } catch (error) {
            console.log(error);
            message.error('Error check console log');
        }
    }
}