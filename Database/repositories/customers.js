// customerDb.js
const { runQuery } = require('./db');
const Customer = require('./models/Customer');

class CustomerDB {
  static async addCustomer(customer) {
    try {
      await runQuery(`INSERT INTO customers (name, email, phone, address, loyalty_points) VALUES (?, ?, ?, ?, ?)`, 
        [customer.name, customer.email, customer.phone, customer.address, customer.loyaltyPoints]);
      console.log(`Added customer: ${customer.name}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Additional methods for customer-related operations can be added here
}

module.exports = CustomerDB;
