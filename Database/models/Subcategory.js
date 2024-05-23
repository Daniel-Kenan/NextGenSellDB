const Model = require("./__init__");

class Subcategory extends Model {
    static tableName = 'subcategories';
    static tableSchema = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    `;

    constructor(name, categoryId) {
        super();
        this.name = name;
        this.category_id = categoryId;
    }
}