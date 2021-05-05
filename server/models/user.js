let mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: false
  }
});

let User = module.exports = mongoose.model('users', userSchema, 'users');

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit)
};
