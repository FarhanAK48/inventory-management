'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
 
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categories,{
        foreignKey: 'cat_id', // Foreign key in the Products table
        as: 'category', // Alias for the relation,
      
      });

      Products.hasMany(models.Transactions, {
        foreignKey: 'product_id',
        as: 'transactions'
      });
    }
    
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};