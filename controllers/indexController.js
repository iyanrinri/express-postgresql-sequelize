// controllers/indexController.js
exports.home = (req, res) => {
  res.render('index', { title: 'Express' });
};
