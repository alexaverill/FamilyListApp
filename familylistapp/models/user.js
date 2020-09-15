'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log(models.models);
      user.belongsToMany(models.models.events,{through:"givers"});
      user.belongsToMany(models.models.events,{through:"receivers"});
      user.hasMany(models.models.lists);
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordReset: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};