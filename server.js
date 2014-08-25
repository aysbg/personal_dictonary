// modules =================================================
var fs              = require('fs');
var express         = require('express');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');
var app             = express();

app = express();

var port, ipAddr;

// Lets check if its OpenShift
if (process.env.OPENSHIFT_NODEJS_PORT) {
  var dbName = "/dictionary";
  var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;

  mongoose.connect(connection_string);

  port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  ipAddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

} else {
  // development env
  var db = require('./config/db');
  ipAddr = "127.0.0.1";
  port = process.env.PORT || 8080; // set our port
  mongoose.connect(db.url);
}

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

// routes ==================================================
require('./config/routes')(app); // configure our routes

// start app ===============================================
app.listen(port, ipAddr);
console.log('Magic happens on port ' + port);       // shoutout to the user
exports = module.exports = app;     // expose app
