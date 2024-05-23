const Model = require("./__init__");
class Product extends Model {
    static tableName = 'products';
    static tableSchema = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        sku TEXT UNIQUE,
        price REAL,
        stock INTEGER,
        min_stock_level INTEGER,
        vendor TEXT,
        subcategory_id INTEGER,
        FOREIGN KEY(subcategory_id) REFERENCES subcategories(id)
    `;

    constructor(id, name, sku, price, stock, minStockLevel, vendor, subcategoryId) {
        super();
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.stock = stock;
        this.minStockLevel = minStockLevel;
        this.vendor = vendor;
        this.subcategoryId = subcategoryId;
    }
}

module.exports = Product;
