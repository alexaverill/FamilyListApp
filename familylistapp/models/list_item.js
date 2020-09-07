'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  list_item.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    isClaimed: DataTypes.BOOLEAN,
    claimedBy: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list_item',
  });
  return list_item;
};