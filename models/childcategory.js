'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChildCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChildCategory.init({
    category: DataTypes.INTEGER,
    subcategory: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChildCategory',
  });
  return ChildCategory;
};