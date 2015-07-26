/**
 * Populate DB with sample data on server start
 * Controlled by env var DB_SEED
 */

'use strict';

var User = require('../api/user/user.model');
var Job = require('../api/job/job.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Job.find({}).remove(function() {
  Job.create({
    title : 'Warehouse work',
    employer : 'Mr Employer'
  }, {
    title : 'Cashier',
    employer : 'Mrs Corporation'
  }, {
    title : 'Car driver',
    employer : 'Father and Son co'
  },  {
    title : 'Store assistant',
    employer : 'Click and Go Inc'
  },  {
    title : 'Cleaner',
    employer : 'Putsis'
  },{
    title : 'Painter',
    employer : 'Painter Boys'
  }, function() {
      console.log('finished populating jobs');
  });
});
