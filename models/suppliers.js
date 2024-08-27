'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Suppliers.hasMany(models.Products, {
      //   foreignKey: 'sup_id',
      //   as: 'products'
      // });

      Suppliers.hasMany(models.Transactions, {
        foreignKey: 'sup_id',
        as: 'transactions'
      });
    }
  }
  Suppliers.init({
    name: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};