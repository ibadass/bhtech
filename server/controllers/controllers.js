let User = require('../models/user');
let Data = require('../models/data');
let moment = require('moment');

exports.add = async function (req, res, next) {
  setInterval(function () {
    let raw = Math.ceil(Math.random() * (150 + 15)) - 15;
    let filtered = filterRaw(raw);
    let data = new Data({
      raw: raw,
      filtered: filtered,
      date: new Date()
    });
    data.save();
  }, 3000);
};

exports.findByDate = async function (req, res, next) {
  let startDate = moment(req.params.date, 'YYYY-MM-DD').set({"hour": 0, "minute": 0, "second": 0});
  let endDate = moment(req.params.date, 'YYYY-MM-DD').set({"hour": 23, "minute": 59, "second": 59});
  Data.find({ date: { $gte: startDate, $lte: endDate }}, function(error, data){
    console.log(error)
    console.log(data)
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json(data);
    }
    next();
  })
};

exports.findAll = async function (req, res, next) {
  Data.find(function(error, data){
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json(data);
    }
    next();
  })
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

function filterRaw (raw) {
  let fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 100];
  let filtered;
  if (raw < 100) {
    let tmpFilter = fibonacci.reduce((prev, curr) => {
      return Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev
    });
    filtered = (tmpFilter < raw) ? fibonacci[fibonacci.indexOf(tmpFilter) + 1] : tmpFilter;
  } else {
    filtered = 100
  }
  return filtered;
}
