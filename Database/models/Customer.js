class Customer {
    constructor(id, name, email, phone, address, loyaltyPoints = 0) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.loyaltyPoints = loyaltyPoints;
    }
    
  }
  
  module.exports = Customer;
  