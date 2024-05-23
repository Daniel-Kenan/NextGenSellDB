const {Table,Object} =  require('./Database/Database.js');

(async function () {
  try {

    
    const apple = new Product(null, 'Apple', 'SKU001', 0.5, 100, 10, 'Best Farms', 1);
    const orange = new Product(null, 'Orange', 'SKU002', 0.75, 150, 15, 'Citrus Valley', 1);
    await ProductTable.addProduct(apple);
    await ProductTable.addProduct(orange);

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
