const db = require('./Database/db');
const Product = require('./Database/models/Product');
const Customer = require('./Database/models/Customer');

(async function () {
  try {
    await db.addCategory('Fruits');
    await db.addSubcategory('Citrus', 1);

    const apple = new Product(null, 'Apple', 'SKU001', 0.5, 100, 10, 'Best Farms', 1);
    const orange = new Product(null, 'Orange', 'SKU002', 0.75, 150, 15, 'Citrus Valley', 1);
    await db.addProduct(apple);
    await db.addProduct(orange);

    const john = new Customer(null, 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Elm St');
    const jane = new Customer(null, 'Jane Smith', 'jane.smith@example.com', '098-765-4321', '456 Oak St');
    await db.addCustomer(john);
    await db.addCustomer(jane);

    await db.recordSale(1, 1, 10, 'cash', 'Alice');
    await db.recordSale(2, 2, 5, 'card', 'Bob');

    await db.moveProduct(1, 2);
    await db.deleteProduct(2);
  } catch (err) {
    console.error(err.message);
  } finally {
    db.db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  }
})();
