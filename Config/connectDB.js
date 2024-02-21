const { Sequelize } = require("sequelize");
const mysql = require('mysql2');
const sequenlize = new Sequelize("vegetable_app", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequenlize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};


module.exports =  connectDB
    

