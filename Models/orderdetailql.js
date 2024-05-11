"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetailQL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetailQL.init(
    {
      NameUser: DataTypes.STRING,
      Email: DataTypes.STRING,
      ListProductName: DataTypes.STRING,
      Total: DataTypes.DOUBLE,
      Country: DataTypes.STRING,
      PaymentMethod: DataTypes.STRING,
      PostalCode: DataTypes.STRING,
      CreditCardNumber: DataTypes.STRING,
      AccountNumber: DataTypes.STRING,
      CardHolder: DataTypes.STRING,
      Address: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      TokenUser: DataTypes.STRING,
      Status: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderDetailQL",
    }
  );
  return OrderDetailQL;
};
