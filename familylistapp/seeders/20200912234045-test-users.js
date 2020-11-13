const bcrypt = require('bcrypt');
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
   const saltRounds = 10;
   let passwordIn = "admin";
   const hashed = await new Promise((resolve,reject)=>{
    bcrypt.hash(passwordIn,saltRounds,(err,hash)=>{
        if(err){
           reject(err);
        }else{
            resolve(hash);
        }
    });
});
//await queryInterface.bulkDelete('users', null, {});
   await queryInterface.bulkInsert('users',[
    {
      username: "admin",
      password: hashed,
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: true,
     createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      username: "user2",
      password: hashed,
      passwordReset: false,
      email: "test@test.com",
      birthday: new Date(),
      isAdmin: false,
     createdAt: new Date(),
       updatedAt: new Date()
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

    await queryInterface.bulkDelete('users', null, {});
  }
};
