class Product {
    constructor(id, name, sku, price, stock, minStockLevel, vendor, subcategoryId) {
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
  