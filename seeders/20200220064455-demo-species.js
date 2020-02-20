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

    return queryInterface.bulkInsert('species', [
      {
        name: "Cat",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: "Dog",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: "Rabbit",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: "Bird",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: "Sugar Glider",
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
