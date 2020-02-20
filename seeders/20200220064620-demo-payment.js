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

    return queryInterface.bulkInsert('payments', [
      {
        no_rek: 1002293999,
        proof_of_transfer: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg",
        user_id: 1,
        status: "premium",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        no_rek: 1002293999,
        proof_of_transfer: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg",
        user_id: 2,
        status: "free",
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
