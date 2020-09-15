'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let models = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
let modules = [
  require('./events.js'),
  require('./list_item.js'),
  require('./lists.js'),
  require('./user.js'),
];

modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});
// fs
//   .readdirSync(models)
//   .filter(file => {
//     console.log(file);
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     let p = path.join(models, file);
//     const model = require(p); //(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
// modules.forEach((module) => {
//   module.associate(db);
// });
// Object.keys(db).forEach(modelName => {
//   console.log("Model Names: "+modelName);
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
  
// });
Object.keys(models).forEach(name =>{
  //console.log(name);
  models[name].associate(sequelize);
})
//console.log(models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
