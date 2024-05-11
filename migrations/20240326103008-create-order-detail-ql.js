"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetailQLs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NameUser: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      ListProductName: {
        type: Sequelize.STRING,
      },
      Total: {
        type: Sequelize.DOUBLE,
      },
      Country: {
        type: Sequelize.STRING,
      },
      PaymentMethod: {
        type: Sequelize.STRING,
      },
      PostalCode: {
        type: Sequelize.STRING,
      },
      CreditCardNumber: {
        type: Sequelize.STRING,
      },
      AccountNumber: {
        type: Sequelize.STRING,
      },
      CardHolder: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
      },
      TokenUser: {
        type: Sequelize.STRING,
      },
      Status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderDetailQLs");
  },
};
