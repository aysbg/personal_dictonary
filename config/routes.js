module.exports = function (app) {
  'use strict';

  // get an instance of router
//  var router = app.Router();

//  // home page route (http://localhost:8080)
//    router.get('/', function(req, res) {
//      res.send('im the home page!');
//    });
//
//  // about page route (http://localhost:8080/about)
//    router.get('/about', function(req, res) {
//      res.send('im the about page!');
//    });
//

  var User = require('../db/User.js');
  var Lang = require('../db/Language.js');


  // Language routes
  // -------------------------
  app.get('/languages/:email', function (req, res) {
    Lang.find({ user_email: req.params.email }, function(err, docs) {
      if (!err) {
        res.json(docs);
      } else {
        res.send(err);
      }
    });
  });

  app.post('/languages', function (req, res) {
    var lang = new Lang(req.body);
    console.log(req.body);

    lang.save(function(err, lang) {
      if (err) return console.log(err);
      return res.send(lang);
    });
  });

  app.post('/languages/types', function (req, res) {
    var userEmail = req.body.user_email;
    var wordings = {
      wordType: req.body.translations[0].wordType,
      words: []
    };

    Lang.collection.update(
      { user_email: userEmail },
      { $push: { translations: wordings } },
      function(err) {
        if(!err) {
          console.log('lang is updated');
          return res.send(true);
        } else {
          console.log(err);
        }
      }
    );

  });

  app.post('/languages/translations/insert', function (req, res) {
    var userEmail = req.body.user_email,
        transLang = req.body.translating_to,
        wordType = req.body.wordType,
        words = req.body.words;

    Lang.collection.update(
      { user_email: userEmail, translating_to: transLang, 'translations.wordType': wordType },
      { $push: { 'translations.$.words': words } },
      function(err) {
        if(!err) {
          console.log('translations added');
          return res.send(true);
        } else {
          console.log(err);
        }
      }
    );

  });

  // Edit translation
  // Notice: This will replace whole translation of the given wordType
  app.post('/languages/translations/update', function (req, res) {
    var userEmail = req.body.user_email,
        wordType = req.body.wordType,
        words = req.body.words;

    Lang.update(
      { user_email: userEmail, 'translations.wordType': wordType },
      { $set: { 'translations.$.words': words } },
      function (err) {
        if(!err) {
          console.log('translation is updated');
          return res.send(true);
        } else {
          console.log(err);
        }
      }
    )
  });

  // Delete translation
  app.post('/languages/translations/delete', function (req, res) {
    // values to find translation
    var userEmail = req.body.user_email,
        wordType = req.body.wordType,
        original = req.body.original;

    Lang.collection.update(
      { user_email: userEmail, 'translations.wordType': wordType },
      { $pull: { 'translations.$.words': { 'original': original } } },
      function(err) {
        if(!err) {
          console.log('translation is removed');
          return res.send(true);
        } else {
          console.log(err);
        }
      })

  });


  // User routes
  // -------------------------
  app.post('/login', function(req, res) {
    User.find({ email: req.body.email, password: req.body.password }, function(err, user) {
      if (!err) {
        return res.send(true);
      }

      console.log(err);
    });
  });

  app.get('/user/:email', function(req, res) {
    User.find({ email: req.params.email }, function(err, user) {
      if (!err) {
        return res.json(user);
      }

      return res.send(err);
    });
  });

  app.get('/users', function(req, res) {
    User.find().sort({ register_date: 'asc' }).exec(function(err, users) {
      if (!err) {
        res.json(users);
      } else {
        res.send(err);
      }
    });
  });

  app.post('/users', function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
      if (!err) {
        return console.log('user created');
      } else {
        return console.log(err);
      }
    });

    return res.send(user);
  });

  app.delete('/users/:unique_id', function(req, res) {
    User.remove({ unique_id: req.params.unique_id }, function(err) {
      if(!err) {
        console.log('user is removed');
        return res.send(true);
      } else {
        console.log(err);
      }
    });
  });

  app.put('/users/:unique_id', function(req, res) {
    var memberData = req.body;

    User.update({ unique_id: req.params.unique_id }, memberData, function(err) {
      if(!err) {
        console.log('user is updated');
        return res.send(true);
      } else {
        console.log(err);
      }
    });
  });


  // frontend routes
  // -------------------------
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/layout.html');
  });
};
