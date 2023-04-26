'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    image: DataTypes.STRING,
    banner: DataTypes.STRING,
    status:
    {
     type:DataTypes.INTEGER,
     defaultValue:1
    }
     
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};