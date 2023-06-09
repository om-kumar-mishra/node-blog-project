'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubCategory.init({
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};