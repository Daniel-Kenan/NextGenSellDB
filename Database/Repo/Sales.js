
const { runQuery } = require('../Setup');


class SaleTable {
  static async addCustomer(customer) {
    try {
      await runQuery(`INSERT INTO customers (name, email, phone, address, loyalty_points) VALUES (?, ?, ?, ?, ?)`, 
        [customer.name, customer.email, customer.phone, customer.address, customer.loyaltyPoints]);
      console.log(`Added customer: ${customer.name}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  
 
}

module.exports = SaleTable;
