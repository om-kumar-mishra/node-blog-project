'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_registration.init({
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    
    
    password:DataTypes.STRING,
      
    
    mobile: DataTypes.STRING,
    image: DataTypes.STRING,
    status:{
      type:  DataTypes.INTEGER,
      defaultValue: 0
    },
    activationCode: DataTypes.INTEGER,
    loginType: DataTypes.STRING,
    LoginId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'user_registration',
  });
  return user_registration;
};