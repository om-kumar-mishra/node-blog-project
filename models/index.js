'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user =   require("./user")(sequelize,Sequelize)
db.category =   require("./category")(sequelize,Sequelize)
db.subcategory =require("./subcategory")(sequelize,Sequelize)
db.chidcategory =require("./childcategory")(sequelize,Sequelize)
db.brand =require("./brand")(sequelize,Sequelize)
db.product =require("./products")(sequelize,Sequelize)
db.cms =require("./cms")(sequelize,Sequelize)
db.blog =require("./blog")(sequelize,Sequelize)
db.trending =require("./trending")(sequelize,Sequelize)
db.setting =require("./setting")(sequelize,Sequelize)
db.user_registration =require("./user_registration")(sequelize,Sequelize)
db.alllikes =require("./alllikes")(sequelize,Sequelize)
db.Unlikes =require("./unlikes")(sequelize,Sequelize)
db.comments =require("./comments")(sequelize,Sequelize)
db.contact =require("./contact")(sequelize,Sequelize)
db.signup =require("./signup")(sequelize,Sequelize)
db.profile =require("./profile")(sequelize,Sequelize)
db.fakertable =require("./faker")(sequelize,Sequelize)
db.faker_2 =require("./faker_2")(sequelize,Sequelize)
db.user_api =require("./user_api")(sequelize,Sequelize)







module.exports = db;
