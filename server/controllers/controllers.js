let User = require('../models/user');

exports.index = async function (req, res, next) {
  let value = Math.ceil(Math.random() * (100 + 15)) - 15;
  res.status(200).json(value);
  next()
};

exports.filter = async function (req, res, next) {
  let input = parseFloat(req.params.value);
  res.status(200).json(input + Math.random());
  next()
};

exports.newuser = async function (req, res, next) {
  const user = new User({
    username: req.body.username,
  });
  user.save(function (error) {
    if (error) {
      res.status(500).json(error)
    }
    res.status(201).json('Utilisateur créé');
    next()
  })
};


exports.edituser = async function (req, res, next) {
  let user = await User.findOne({'_id': req.params.id}).exec();

  if (req.body.username && user.username !== req.body.username) {
    user.username = req.body.username
  }
  user.save(function (error) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json('Utilisateur modifié');
    }
  });
  next();
};
