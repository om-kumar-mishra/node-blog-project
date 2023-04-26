'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UnLikes.init({
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UnLikes',
  });
  return UnLikes;
};