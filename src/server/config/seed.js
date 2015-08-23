/**
 * Populate DB with sample data on server start
 * Controlled by env var DB_SEED
 */

'use strict';

let _ = require('lodash');
let Address = require('../api/address/address.model');
let User = require('../api/user/user.model');
let Job = require('../api/job/job.model');

seed();

function seed() {
  let persons = [];
  let companies = [];
  
  Address
  .find({}).remove()
  .then(function() {
    return User.find({}).remove();
  })
  .then(function() {
    return Promise.all(initPersonUsers());
  })
  .then(function(users) {
    console.log('finished populating person users');
    persons = users.map(u => {
      return { id: u._id, name: u.name }
    });
    return Promise.all(initCompanyUsers());
  }, function(err) {
    console.log('Cannot initialize users: ' + err);
  })
  .then(function(users) {
    console.log('finished populating company users');
    companies = users.map(u => {
      return { id: u._id, name: u.name }
    });
    return Job.find({}).remove();
  }, function(err) {
    console.log('Cannot initialize companies: ' + err);
  })
  .then(function() {
    return Promise.all(initJobs(persons, companies));
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
  let jobs = [];

  const userJobs = [ 
    'Räystäiden puhdistus',
    'Ikea-hyllyn kokoaminen',
    'Muuttoapu',
    'Auton käyttö katsastuksessa',
  ];
  const companyJobs = [ 
    'Inventaarion laskenta',
    'Tavaran vastaanotto ja kuittaus'
  ];

  userJobs.map(jobTitle => {
    let employer = _.sample(persons);
    jobs.push(Job.create({
      title : jobTitle,
      employer : employer.id, 
      employerName : employer.name, 
    }));
  });

  companyJobs.map(jobTitle => {
    let employer = _.sample(companies);
    jobs.push(Job.create({
      title : jobTitle,
      employer : employer.id, 
      employerName : employer.name, 
    }));
  });

  return jobs;
  
};