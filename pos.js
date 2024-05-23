const {Table,Object} =  require('./Database/Database.js');

(async function () {
  try {
    const apple = await new Object.Product(null, 'Apple', 'SKU0s01', 0.5, 100, 10, 'Best Farms', 1);
    await Table.Products.addProduct(apple);

  } catch (err) {
    console.error(err.message);
  } finally {
      console.log('Closed the database connection.'); 
  }
})();
