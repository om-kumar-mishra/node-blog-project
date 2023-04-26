'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cms.init({
    title:
    {
      type: DataTypes.STRING,
       allowNull: false,
       unique:true,
    },
    slugName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    discription: DataTypes.TEXT,
    image: DataTypes.STRING,
    satus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cms',
  });
  return cms;
};