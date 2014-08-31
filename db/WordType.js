var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var wordTypeSchema = new Schema({
  name: { type: String, unique: true }
});

module.exports = mongoose.model('WordType', wordTypeSchema);
