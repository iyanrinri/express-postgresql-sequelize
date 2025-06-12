const Employee = require('../models/Employee');

const bcrypt = require('bcryptjs');

exports.list = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const params = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
      password: passwordHash
    };
    const employee = await Employee.create(params);
    delete employee.password;
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body.password) {
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      req.body.password = passwordHash;
    }
    const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    const employee = await Employee.findByPk(req.params.id);
    delete employee.password;
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
};
