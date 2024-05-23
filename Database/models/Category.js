const Model = require("./__init__");

class Category extends Model {
    static tableName = 'categories';
    static tableSchema = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    `;

    constructor(name) {
        super();
        this.name = name;
    }
}