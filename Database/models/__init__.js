const { runQuery } = require('../Setup');

class Model {
    constructor() {
        if (this.constructor === Model) {
            throw new Error('Cannot instantiate abstract class Model directly.');
        }
       this.createTable();
    }

    async createTable() {
        const tableName = this.constructor.tableName;
        if (!tableName) {
            throw new Error('Table name not specified in subclass.');
        }
        const schema = this.constructor.tableSchema;
        if (!schema) {
            throw new Error('Table schema not specified in subclass.');
        }

        const query = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                ${schema}
            )
        `;
        try {
            await runQuery(query);
            console.log(`${tableName} table created successfully`);
        } catch (error) {
            console.error(`Error creating ${tableName} table:`, error);
        }
    }

    async save() {
        const tableName = this.constructor.tableName;
        const columns = Object.keys(this).filter(key => key !== 'id').join(', ');
        const placeholders = Object.keys(this).filter(key => key !== 'id').map(() => '?').join(', ');

        const query = `
            INSERT INTO ${tableName} (${columns})
            VALUES (${placeholders})
        `;
        const params = Object.values(this).filter(value => value !== this.id);

        try {
            await runQuery(query, params);
            console.log(`${tableName} added successfully`);
        } catch (error) {
            console.error(`Error adding ${tableName}:`, error);
        }
    }
}

module.exports = Model;
