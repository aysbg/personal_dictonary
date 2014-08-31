var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  native_language: String,
  register_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
