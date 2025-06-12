// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Employee = require('../models/Employee');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Try user login (admin)
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role, type: 'user' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token, type: 'user', username: user.username, role: user.role });
  }

  // Try employee login
  const employee = await Employee.findOne({ where: { email: username } });
  if (employee && await bcrypt.compare(password, employee.password)) {
    const token = jwt.sign({ id: employee.id, email: employee.email, type: 'employee' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token, type: 'employee', email: employee.email });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

exports.profile = async (req, res) => {
  if (req.user.type === 'user') {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    return res.json({ user });
  } else if (req.user.type === 'employee') {
    const employee = await Employee.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    return res.json({ employee });
  }
  res.status(404).json({ message: 'User not found' });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
    req.user = user;
    next();
  });
};
