var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var languageSchema = new Schema({
  user_email: { type: String, unique: true },
  translating_to: String,
  word_type: String,
  words: [
    {
      original: String,
      translated:String
    }
  ]
});

module.exports = mongoose.model('Language', languageSchema);
