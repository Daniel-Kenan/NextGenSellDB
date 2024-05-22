// db.js
const sqlite3 = require('sqlite3').verbose();
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Sale = require('./models/Sale');

// Open a database connection
const db = new sqlite3.Database('./pos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the pos.db SQLite database.');
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS subcategories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price REAL,
    stock INTEGER,
    min_stock_level INTEGER,
    vendor TEXT,
    subcategory_id INTEGER,
    FOREIGN KEY(subcategory_id) REFERENCES subcategories(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    loyalty_points INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    total_price REAL,
    payment_method TEXT,
    date TEXT,
    salesperson TEXT,
    FOREIGN KEY(customer_id) REFERENCES customers(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);
});

// Helper function for prepared statements
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Database functions
async function addCategory(name) {
  try {
    await runQuery(`INSERT INTO categories (name) VALUES (?)`, [name]);
    console.log(`Added category: ${name}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function addSubcategory(name, categoryId) {
  try {
    await runQuery(`INSERT INTO subcategories (name, category_id) VALUES (?, ?)`, [name, categoryId]);
    console.log(`Added subcategory: ${name}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function addProduct(product) {
  try {
    await runQuery(`INSERT INTO products (name, sku, price, stock, min_stock_level, vendor, subcategory_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [product.name, product.sku, product.price, product.stock, product.minStockLevel, product.vendor, product.subcategoryId]);
    console.log(`Added product: ${product.name}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function addCustomer(customer) {
  try {
    await runQuery(`INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)`, 
      [customer.name, customer.email, customer.phone, customer.address]);
    console.log(`Added customer: ${customer.name}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function updateProduct(product) {
  try {
    await runQuery(`UPDATE products SET name = ?, sku = ?, price = ?, stock = ?, min_stock_level = ?, vendor = ?, subcategory_id = ? WHERE id = ?`, 
      [product.name, product.sku, product.price, product.stock, product.minStockLevel, product.vendor, product.subcategoryId, product.id]);
    console.log(`Updated product: ${product.name}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function deleteProduct(productId) {
  try {
    await runQuery(`DELETE FROM products WHERE id = ?`, [productId]);
    console.log(`Deleted product with id: ${productId}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function moveProduct(productId, newSubcategoryId) {
  try {
    await runQuery(`UPDATE products SET subcategory_id = ? WHERE id = ?`, [newSubcategoryId, productId]);
    console.log(`Moved product with id: ${productId} to subcategory: ${newSubcategoryId}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function recordSale(customerId, productId, quantity, paymentMethod, salesperson) {
  try {
    await runQuery("BEGIN TRANSACTION");

    const productRow = await getQuery(`SELECT id, name, sku, price, stock, min_stock_level, vendor, subcategory_id FROM products WHERE id = ?`, [productId]);
    const product = new Product(productRow.id, productRow.name, productRow.sku, productRow.price, productRow.stock, productRow.min_stock_level, productRow.vendor, productRow.subcategory_id);

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    const totalPrice = product.price * quantity;
    const date = new Date().toISOString();

    await runQuery(`INSERT INTO sales (customer_id, product_id, quantity, total_price, payment_method, date, salesperson) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [customerId, productId, quantity, totalPrice, paymentMethod, date, salesperson]);
    console.log(`Recorded sale: Customer ${customerId} bought ${quantity} of Product ${productId}`);

    product.updateStock(product.stock - quantity);
    await updateProduct(product);

    await runQuery("COMMIT");
  } catch (err) {
    await runQuery("ROLLBACK");
    console.error(err.message);
  }
}

module.exports = {
  addCategory,
  addSubcategory,
  addProduct,
  addCustomer,
  updateProduct,
  deleteProduct,
  moveProduct,
  recordSale
};
