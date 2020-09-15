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
      events.belongsToMany(models.models.user,{as:"Givers",through:'givers'});
      events.belongsToMany(models.models.user,{as:"Recievers",through:"recievers"});
      events.hasMany(models.models.lists)
    }
  };
  events.init({
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    image: DataTypes.STRING,
    comments: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};