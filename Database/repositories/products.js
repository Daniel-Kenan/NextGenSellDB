// productDb.js
const { runQuery, getQuery } = require('./db');
const Product = require('./models/Product');

class ProductDB {
  static async addProduct(product) {
    try {
      await runQuery(`INSERT INTO products (name, sku, price, stock, min_stock_level, vendor, subcategory_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [product.name, product.sku, product.price, product.stock, product.minStockLevel, product.vendor, product.subcategoryId]);
      console.log(`Added product: ${product.name}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  static async updateProduct(product) {
    try {
      await runQuery(`UPDATE products SET name = ?, sku = ?, price = ?, stock = ?, min_stock_level = ?, vendor = ?, subcategory_id = ? WHERE id = ?`, 
        [product.name, product.sku, product.price, product.stock, product.minStockLevel, product.vendor, product.subcategoryId, product.id]);
      console.log(`Updated product: ${product.name}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  static async deleteProduct(productId) {
    try {
      await runQuery(`DELETE FROM products WHERE id = ?`, [productId]);
      console.log(`Deleted product with id: ${productId}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  static async moveProduct(productId, newSubcategoryId) {
    try {
      await runQuery(`UPDATE products SET subcategory_id = ? WHERE id = ?`, [newSubcategoryId, productId]);
      console.log(`Moved product with id: ${productId} to subcategory: ${newSubcategoryId}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  static async getProductById(productId) {
    try {
      const row = await getQuery(`SELECT id, name, sku, price, stock, min_stock_level, vendor, subcategory_id FROM products WHERE id = ?`, [productId]);
      return new Product(row.id, row.name, row.sku, row.price, row.stock, row.min_stock_level, row.vendor, row.subcategory_id);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = ProductDB;
