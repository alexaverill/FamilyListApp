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
   await queryInterface.bulkInsert('users',[
    {
      username: "user1",
      password: "password",
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: false,
     createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      username: "user2",
      password: "password",
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: false,
     createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      username: "user3",
      password: "password",
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: false,
     createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      username: "user4",
      password: "password",
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: false,
     createdAt: new Date(),
       updatedAt: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
