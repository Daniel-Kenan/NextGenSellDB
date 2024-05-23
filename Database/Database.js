
const Product = require('./Models/Product');
const Customer = require('./Models/Customer');
const Sale = require('./Models/Sale');
const ProductTable = require('./Repo/Products.js');
const CustomerTable = require('./Repo/Customers.js');
// const SaleTable = require('./DAL/Sales');


const Objects = { 
  models:{
  Customer: Customer,
  Product:Product,
  Sale:Sale
    }, 
  tables:{
    ProductTable: ProductTable,
    CustomerTable: CustomerTable,
    SaleTable: SaleTable,   
}
 }

 const Object = Objects.models
 const Table = Objects.tables

module.exports = {Object,Table};
