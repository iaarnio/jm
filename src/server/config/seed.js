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
    title : 'Räystäiden puhdistus',
    employer : 'Olli Omakotilainen'
  }, {
    title : 'Ikea-hyllyn kokoaminen',
    employer : 'Anna Avuntarpeinen'
  },  {
    title : 'Inventaarion laskenta',
    employer : 'Sekavarakauppa Oy'
  }, {
    title : 'Muuttoapu',
    employer : 'Mikko Muuttaja'
  },  {
    title : 'Auton käyttö katsastuksessa',
    employer : 'Kirsi Kiireinen'
  },{
    title : 'Tavaran vastaanotto ja kuittaus',
    employer : 'Tavara Ky'
  }, function() {
      console.log('finished populating jobs');
  });
});
