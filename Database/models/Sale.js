const Model = require("./__init__");

class Sale extends Model {
  static tableName = 'sales';
  static tableSchema = `
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
  `;

  constructor(customerId, productId, quantity, totalPrice, paymentMethod, date, salesperson) {
      super();
      this.customer_id = customerId;
      this.product_id = productId;
      this.quantity = quantity;
      this.total_price = totalPrice;
      this.payment_method = paymentMethod;
      this.date = date;
      this.salesperson = salesperson;
  }
}