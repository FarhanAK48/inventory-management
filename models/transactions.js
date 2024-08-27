"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });

      // A Transaction belongs to a Supplier
      Transactions.belongsTo(models.Suppliers, {
        foreignKey: "sup_id",
        as: "supplier",
      });
    }
  }
  Transactions.init(
    {
      quantity: DataTypes.INTEGER,
      date: DataTypes.DATE,
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      sup_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Suppliers",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
