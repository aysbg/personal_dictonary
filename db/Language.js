var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var languageSchema = new Schema({
  user_email: { type: String, unique: true },
  native_language: String,
  translating_to: String,
  translations: [
    {
      wordType: String,
      words: [
        {
          original: String,
          translated:String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Language', languageSchema);
