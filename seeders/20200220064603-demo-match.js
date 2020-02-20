'use strict';

const date = new Date();
const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('matches', [
      {
        status: true,
        pet_id: 1,
        pet_like_id: 2,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        status: true,
        pet_id: 1,
        pet_like_id: 3,
        createdAt: dateTime,
        updatedAt: dateTime
      }
      ,
      {
        status: true,
        pet_id: 2,
        pet_like_id: 3,
        createdAt: dateTime,
        updatedAt: dateTime
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
