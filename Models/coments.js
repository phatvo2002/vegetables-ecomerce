'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coments.init({
    content: DataTypes.STRING,
    idProduct: DataTypes.STRING,
    nameUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coments',
  });
  return Coments;
};