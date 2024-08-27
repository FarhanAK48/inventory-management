const {Sequelize} = require('sequelize');

const name ='inventory1';
const user = 'root';
const pwd= '';
const root = 'localhost';

const sequelize =  new Sequelize(name, user,pwd,{
    host:root,
    port:3306,
    dialect:'mysql'
})

 const db = {}
 db.Sequelize= Sequelize,
 db.sequelize = sequelize,

 db.User = require('./models/user')(sequelize,Sequelize);
 db.Products = require('./models/products')(sequelize,Sequelize);
 db.Category = require('./models/category')(sequelize,Sequelize);
 db.Suppliers = require('./models/suppliers')(sequelize,Sequelize);
 db.Transactions = require('./models/transactions')(sequelize,Sequelize);

 module.exports = db;