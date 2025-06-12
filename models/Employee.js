const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Employee = sequelize.define('employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  jobTitle: DataTypes.STRING,
  department: DataTypes.STRING,
  salary: DataTypes.INTEGER,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
