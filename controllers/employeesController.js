const Employee = require('../models/Employee');

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
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    const employee = await Employee.findByPk(req.params.id);
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
