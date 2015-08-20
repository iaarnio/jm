/**
 * Populate DB with sample data on server start
 * Controlled by env var DB_SEED
 */

'use strict';

let _ = require('lodash');
let User = require('../api/user/user.model');
let Job = require('../api/job/job.model');

seed();

function seed() {
  console.log('seed');
  let personIds = [];
  let companyIds = [];
  
  User
  .find({}).remove()
  .then(function() {
    return Promise.all(initPersonUsers());
  })
  .then(function(users) {
    console.log('finished populating person users');
    personIds = users.map(u => u._id);
    return Promise.all(initCompanyUsers());
  }, function(err) {
    console.log('Cannot initialize users: ' + err);
  })
  .then(function(users) {
    console.log('finished populating company users');
    companyIds = users.map(u => u._id);
    return Job.find({}).remove();
  }, function(err) {
    console.log('Cannot initialize companies: ' + err);
  })
  .then(function() {
    return Promise.all(initJobs(personIds, companyIds));
  })
  .then(function(jobs) {
    console.log('finished populating jobs');
  }, function(err) {
    console.log('Cannot initialize jobs: ' + err);
  });
}


function initPersonUsers() {
  let admin = User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  });
  admin.then(undefined, function(err) {
    console.log('Cannot create admin user');
  }) 
  
  let persons = [];
  
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
  
  return persons;
}

function initCompanyUsers() {
  let companies = [];

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

  return companies;
}

function initJobs(persons, companies) {
  var jobs = [];
  
  jobs.push(Job.create({
    title : 'Räystäiden puhdistus',
    employer : _.sample(persons)
  }));
  jobs.push(Job.create({
    title : 'Ikea-hyllyn kokoaminen',
    employer : _.sample(persons)
  }));
  jobs.push(Job.create({
    title : 'Inventaarion laskenta',
    employer : _.sample(companies)
  }));
  jobs.push(Job.create({
    title : 'Muuttoapu',
    employer : _.sample(persons)
  }));
  jobs.push(Job.create({
    title : 'Auton käyttö katsastuksessa',
    employer : _.sample(persons)
  }));
  jobs.push(Job.create({
    title : 'Tavaran vastaanotto ja kuittaus',
    employer : _.sample(companies)
  }));
  
  return jobs;
  
};