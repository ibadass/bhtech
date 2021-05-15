let mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
  raw: {
    type: Number,
    required: true
  },
  filtered: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

let Data = module.exports = mongoose.model('data', dataSchema, 'data');

module.exports.get = function (callback, limit) {
  Data.find(callback).limit(limit)
};
