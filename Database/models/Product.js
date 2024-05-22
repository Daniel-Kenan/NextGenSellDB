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
  
    updateStock(newStock) {
      this.stock = newStock;
    }
  
    calculateDiscount(discountPercentage) {
      return this.price * (1 - discountPercentage);
    }
  }
  
  module.exports = Product;
  