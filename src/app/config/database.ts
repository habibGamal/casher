import Database from "tauri-plugin-sql-api";
const username = 'root';
const password = 'root';
const host = 'localhost';
const database = 'test2';
export const dbPromise = Database.load(`mysql://${username}:${password}@${host}/${database}`)