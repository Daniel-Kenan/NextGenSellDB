class Sale {
    constructor(id, customerId, productId, quantity, totalPrice, paymentMethod, date, salesperson) {
      this.id = id;
      this.customerId = customerId;
      this.productId = productId;
      this.quantity = quantity;
      this.totalPrice = totalPrice;
      this.paymentMethod = paymentMethod;
      this.date = date;
      this.salesperson = salesperson;
    }
  }
  
  module.exports = Sale;
  