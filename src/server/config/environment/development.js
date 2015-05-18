'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/jokumuu-dev'
  },

  // Server port
  port: process.env.PORT || 9000,

  seedDB: true
};
