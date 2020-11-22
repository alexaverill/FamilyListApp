'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('lists', 'eventId', {
          type: Sequelize.DataTypes.INTEGER,
          references:{
            model:'events',
            onDelete:"CASCADE",
            key:'id'
          }
        }, { transaction: t }),
        queryInterface.addColumn('lists', 'userId', {
          type: Sequelize.DataTypes.INTEGER,
          references:{
            model:'users',
            onDelete:"CASCADE",
            key:'id'
          }
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      // return Promise.all([
      //   queryInterface.removeColumn('Person', 'petName', { transaction: t }),
      //   queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })
      // ]);
    });
  }
};
