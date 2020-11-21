'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log(models.models);
      // define association here
      //{ onDelete: 'cascade' }
      events.belongsToMany(models.models.user,{as:"Givers",through:'givers',onDelete:'cascade'});
      events.belongsToMany(models.models.user,{as:"Recievers",through:"recievers", onDelete:'cascade'});
      events.hasMany(models.models.lists,{onDelete:'cascade'})
    }
  };
  events.init({
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATEONLY,
    image: DataTypes.STRING,
    comments: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};