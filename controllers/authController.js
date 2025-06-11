// controllers/authController.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

exports.login = (req, res) => {
  const { username, password } = req.body;
  // Contoh: hardcoded user
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

exports.profile = (req, res) => {
  res.json({ message: 'This is a protected profile', user: req.user });
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
