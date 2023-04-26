'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    title: DataTypes.STRING,
    sku: DataTypes.STRING,
    modelName: DataTypes.STRING,
    category: DataTypes.INTEGER,
    subcategory: DataTypes.INTEGER,
    childcategory: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    gst: DataTypes.INTEGER,
    summary: DataTypes.STRING,
    description: DataTypes.STRING,
    exchangeday: DataTypes.STRING,
    returnDay: DataTypes.STRING,
    paymentMode: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    sellingPrice: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};