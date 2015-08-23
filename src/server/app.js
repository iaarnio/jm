'use strict';

var colors = require('colors');

loadEnvVars();
checkEnvVars(['NODE_ENV', 'HOST', 'PORT', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_SEED']);

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');
var http = require('http');
var errors = require('./components/errors');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);

// Populate DB with sample data
if (process.env.DB_SEED) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
//require('./routes')(app);

// Start server
server.listen(process.env.PORT, process.env.HOST);
server.on('error', onError);
server.on('listening', onListening);


// API routes
app.use('/api/jobs', require('./api/job'));
app.use('/api/addresses', require('./api/address'));
app.use('/api/users', require('./api/user'));
app.use('/api/applicants', require('./api/applicant'));

app.use('/auth', require('./auth'));

// All undefined asset or api routes should return a 404
app
  .route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(errors[404]);

// UI routes (all others)
app.use('/*', express.static('./src/client'));

// Event listener for HTTP server "listening" event.
function onListening() {
  console.log('Listening on ' + getBind());
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = getBind();

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function getBind() {
  var addr = server.address();
  var bind;
  if (addr) {
    bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  } else {
    bind = 'port ' + process.env.PORT;
  }
  return bind;  
}

function loadEnvVars() {
  var dotenvLoaded = require('dotenv').load();
  if (!dotenvLoaded) {
    console.log('Warning: missing .env file'.warn);
  }
}

// Check that mandatory environment variables are set
function checkEnvVars(envVars) {
  var EnvBang = require('envbang-node');
  var envbang = new EnvBang(envVars);
  envbang.check();
}

// Expose app
module.exports = app;
