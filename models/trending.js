'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trending.init({
    category: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    blog: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trending',
  });
  return trending;
};