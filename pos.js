// pos.js
const ProductDB = require('./productDb');
const CustomerDB = require('./customerDb');
const Product = require('./models/Product');
const Customer = require('./models/Customer');

(async function () {
  try {
    const apple = new Product(null, 'Apple', 'SKU001', 0.5, 100, 10, 'Best Farms', 1);
    const orange = new Product(null, 'Orange', 'SKU002', 0.75, 150, 15, 'Citrus Valley', 1);
    await ProductDB.addProduct(apple);
    await ProductDB.addProduct(orange);

    const john = new Customer(null, 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Elm St');
    await CustomerDB.addCustomer(john);

    const product = await ProductDB.getProductById(1);
    console.log(`Fetched product: ${product.name}`);

    product.updateStock(product.stock - 10);
    await ProductDB.updateProduct(product);

    await ProductDB.moveProduct(product.id, 2);

    await ProductDB.deleteProduct(2);
  } catch (err) {
    console.error(err.message);
  } finally {
    require('./db').db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  }
})();
