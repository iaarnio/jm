/**
 * Populate DB with sample data on server start
 * Controlled by env var DB_SEED
 */

'use strict';

var _ = require('lodash');
var User = require('../api/user/user.model');
var Job = require('../api/job/job.model');

var personIds = [];
var companyIds = [];

var admin = User.create({
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin'
});
admin.then(undefined, function(err) {
  console.log('Cannot create admin user');
}) 

User.find({}).remove(function() {
  let persons = [];
  let companies = [];

  persons.push(User.create({
    provider: 'local',
    name: 'Kirsi Kiireinen',
    email: 'kirsi@test.com',
    password: 'test'
  }));
  persons.push(User.create({
    provider: 'local',
    name: 'Tytti Työteliäs',
    email: 'tytti@test.com',
    password: 'test'
  }));
  persons.push(User.create({
    provider: 'local',
    name: 'Harri Harrastaja',
    email: 'harri@test.com',
    password: 'test'
  }));
  persons.push(User.create({
    provider: 'local',
    name: 'Antti Ahkera',
    email: 'antti@test.com',
    password: 'test'
  }));
  Promise.all(persons)
  .then(function(users) {
    console.log('finished populating person users');
    personIds = users.map(u => u._id);
    console.log(personIds);
  }, function(err) {
    console.log('Cannot initialize DB users: ' + err);
  });

  companies.push(User.create({
    provider: 'local',
    name: 'Tavara Ky',
    email: 'tavara@test.com',
    password: 'test'
  }));
  companies.push(User.create({
    provider: 'local',
    name: 'Sekavarakauppa Oy',
    email: 'sekatavarakauppa@test.com',
    password: 'test'
  }));
  companies.push(User.create({
    provider: 'local',
    name: 'Suutari Tmi',
    email: 'suutari@test.com',
    password: 'test'
  }));
  Promise.all(companies)
  .then(function(users) {
    console.log('finished populating company users');
    companyIds = users.map(u => u._id);
    console.log(companyIds);
  }, function(err) {
    console.log('Cannot initialize DB users: ' + err);
  });
  
});

var jobs = [];
Job.find({}).remove(function() {
  jobs.push(Job.create({
    title : 'Räystäiden puhdistus',
    employer : _.sample(personIds)
  }));
  jobs.push(Job.create({
    title : 'Ikea-hyllyn kokoaminen',
    employer : _.sample(personIds)
  }));
  jobs.push(Job.create({
    title : 'Inventaarion laskenta',
    employer : _.sample(companyIds)
  }));
  jobs.push(Job.create({
    title : 'Muuttoapu',
    employer : _.sample(personIds)
  }));
  jobs.push(Job.create({
    title : 'Auton käyttö katsastuksessa',
    employer : _.sample(personIds)
  }));
  jobs.push(Job.create({
    title : 'Tavaran vastaanotto ja kuittaus',
    employer : _.sample(companyIds)
  }));

  Promise.all(jobs)
  .then(function(createdJobs) {
    console.log('finished populating jobs');
  }, function(err) {
    console.log('Cannot initialize DB jobs: ' + err);
    console.log(JSON.stringify(err));   
  });


});
