'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('list_items', 'listId', {
          type: Sequelize.DataTypes.INTEGER,
          onDelete:"CASCADE",
          references:{
            model:'lists',
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