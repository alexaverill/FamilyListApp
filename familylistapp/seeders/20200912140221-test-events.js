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
  // await queryInterface.bulkInsert('events',[
  //   //  {
  //   //   eventName: "Event 1",
  //   //   eventDate: new Date(),
  //   //   image: "event_images/1.jpg",
  //   //   comments: "",
  //   //   active: 'true',
  //   //   createdAt: new Date(),
  //   //     updatedAt: new Date()
  //   //  },
  //   //  {
  //   //   eventName: "Event 2",
  //   //   eventDate: new Date(),
  //   //   image: "event_images/1.jpg",
  //   //   comments: "",
  //   //   active: 'true',
  //   //   createdAt: new Date(),
  //   //     updatedAt: new Date()
  //   //      }
  //  ]);
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
