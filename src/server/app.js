/// <reference path="../../typings/node/node.d.ts"/>
/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var http = require('http');
var errors = require('./components/errors');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
//require('./routes')(app);

// Start server
server.listen(config.port, config.ip);
server.on('error', onError);
server.on('listening', onListening);

// API routes
app.use('/api/jobs', require('./api/job'));
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
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof config.port === 'string' ? 'Pipe ' + config.port : 'Port ' + config.port;

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

// Expose app
module.exports = app;
