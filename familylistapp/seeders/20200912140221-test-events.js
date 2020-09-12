'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('events'.[
     {
      eventName: "Event 1",
      eventDate: new Date(2020,01,10),
      image: "",
      comments: "",
      active: true
     },
     {
      eventName: "Event 2",
      eventDate: new Date(2020,10,10),
      image: "",
      comments: "",
      active: true
     }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('events',null,{});
  }
};
