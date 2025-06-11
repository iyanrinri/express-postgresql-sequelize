'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const employees = [];
    for (let i = 0; i < 100; i++) {
      employees.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        salary: faker.number.int({ min: 30000, max: 120000 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Employees', employees, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
