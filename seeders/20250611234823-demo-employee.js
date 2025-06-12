'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const employees = [];
    for (let i = 0; i < 100; i++) {
      const passwordHash = await bcrypt.hash("password" + i , 10);
      const email = "employee" + i + "@example.com";
      employees.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: email,
        password: passwordHash,
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        salary: faker.number.int({ min: 30000, max: 120000 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('employees', employees, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
