const Model = require('./__init__');
class Customer extends Model{

  static tableName = 'customers';
  static tableSchema = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        loyalty_points INTEGER DEFAULT 0
    `;

    constructor(id, name, email, phone, address, loyaltyPoints = 0) {
      super();
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.loyaltyPoints = loyaltyPoints;
    }
    
  }
  
  module.exports = Customer;
  