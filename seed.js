const sequelize = require('./models/db');
const Employee = require('./models/Employee');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

async function seedEmployees() {
  await sequelize.sync({ force: true }); // Drops and recreates tables
  const employees = [];
  for (let i = 0; i < 100; i++) {
    employees.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      jobTitle: faker.person.jobTitle(),
      department: faker.commerce.department(),
      salary: faker.number.int({ min: 30000, max: 120000 })
    });
  }
  await Employee.bulkCreate(employees);
  console.log('Seeded 100 employees');
  process.exit();
}

seedEmployees().catch(e => {
  console.error(e);
  process.exit(1);
});
