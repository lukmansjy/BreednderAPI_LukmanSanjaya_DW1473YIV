'use strict';
const bcrypt = require('bcrypt')

const hashPassword = bcrypt.hashSync('demo', 10);
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

    return queryInterface.bulkInsert('users', [
      {
        breeder: 'Lukman Sanjaya',
        email: 'lukman.rocks@live.com',
        password: hashPassword,
        phone: "082226455525",
        address: "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
        admin: 1,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        breeder: 'Domo User',
        email: 'demo@demo.com',
        password: hashPassword,
        phone: "081234567890",
        address: "Cikupa, Kab. Tangerang, Banten",
        admin: 0,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        breeder: 'Demo Account',
        email: 'demoaccounts@demo.com',
        password: hashPassword,
        phone: "082345678901",
        address: "Surakarta, Jawa Tengah",
        admin: 0,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        breeder: 'Akun Demo',
        email: 'akun@demo.com',
        password: hashPassword,
        phone: "083456789012",
        address: "Sukoharjo, Jawa Tengah",
        admin: 0,
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
