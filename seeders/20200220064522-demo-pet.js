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
    return queryInterface.bulkInsert('pets', [
      {
        name: 'Kucing Bar Bar',
        gender: "Male",
        species_id: 1,
        age_id: 3,
        user_id: 1,
        about_pet: "Kucing bar bar yang suka jatuhin barang dimeja",
        photo: "https://i.imgur.com/2x0oIpb.jpg",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Kucing Oren',
        gender: "Male",
        species_id: 1,
        age_id: 3,
        user_id: 2,
        about_pet: "Kucing Bar Bar Tapi Luchu",
        photo: "https://i.imgur.com/pqggrK0.jpg",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Kucing Janda',
        gender: "Famale",
        species_id: 1,
        age_id: 3,
        user_id: 3,
        about_pet: "Kucing janda beranak lima, mencari kucing pria yang bertangung jawab",
        photo: "https://i.imgur.com/9if0pJQ.jpg",
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
