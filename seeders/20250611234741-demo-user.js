'use strict';

const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await queryInterface.bulkInsert('users', [
        {
          username: 'admin',
          password: passwordHash,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    } catch (error) {
      console.error('Error inserting admin user:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { username: 'admin' }, {});
  }
};
