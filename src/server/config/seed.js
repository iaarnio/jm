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
  let addresses = [];
  let persons = [];
  let companies = [];
  
  Address
  .find({}).remove()
   .then(function() {
    return Promise.all(initAddresses());
  })
  .then(function(addr) {
    console.log('finished initializing addresses');
    addresses = addr.map(a => a._id);
    return Promise.resolve();
  })
  .then(function() {
    return User.find({}).remove();
  })
  .then(function() {
    return Promise.all(initPersonUsers());
  })
  .then(function(users) {
    console.log('finished initializing person users');
    persons = users.map(u => {
      return { id: u._id, name: u.name }
    });
    return Promise.all(initCompanyUsers());
  }, function(err) {
    console.log('Cannot initialize users: ' + err);
  })
  .then(function(users) {
    console.log('finished initializing company users');
    companies = users.map(u => {
      return { id: u._id, name: u.name }
    });
    return Job.find({}).remove();
  }, function(err) {
    console.log('Cannot initialize companies: ' + err);
  })
  .then(function() {
    return Promise.all(initJobs(persons, companies, addresses));
  })
  .then(function(jobs) {
    console.log('finished initializing jobs');
  }, function(err) {
    console.log('Cannot initialize jobs: ' + err);
  });
}


function initAddresses() {
  let addressPromises = [];
  
  let data = [
    { road: 'Engelinaukio 1', city: 'Helsinki', latitude: 60.1569031, longitude: 24.9371668},
    { road: 'Albertinkatu 12', city: 'Helsinki', latitude: 60.1609023, longitude: 24.9378569},
    { road: 'Arhotie 19', city: 'Helsinki', latitude: 60.2188884, longitude: 25.0845568},
    { road: 'Porthaninkatu 2', city: 'Helsinki', latitude: 60.1815129, longitude: 24.9500923},
    { road: 'Kaskenpolttajantie 1', city: 'Espoo', latitude: 60.1785225, longitude: 24.6586858},
    { road: 'Nöykkiönkatu 6', city: 'Espoo', latitude: 60.1554231, longitude: 24.6633403},
    { road: 'Bembölentie 10 ', city: 'Kauniainene', latitude: 1, longitude: 24.6995071},
    { road: 'Tikkurilantie 11', city: 'Vantaa', latitude: 60.3166416, longitude: 24.8695245}
  ];
  
  data.forEach(function(addr) {
    addressPromises.push(Address.create(addr));  
  })
  
  return addressPromises;
}

function initPersonUsers() {  
  let personPromises = [];
  
  let data = [
    { provider: 'local', name: 'Kirsi Kiireinen', email: 'kirsi@test.com', password: 'test' },
    { provider: 'local', name: 'Tytti Työteliäs', email: 'tytti@test.com', password: 'test' },
    { provider: 'local', name: 'Harri Harrastaja', email: 'harri@test.com', password: 'test' },
    { provider: 'local', name: 'Antti Ahkera', email: 'antti@test.com', password: 'test' }
  ];

  data.forEach(function(user) {
    personPromises.push(User.create(user));  
  })  
  
  createAdminUser();
  
  return personPromises;
}

function createAdminUser() {
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
}
 
function initCompanyUsers() {
  let companyPromises = [];

  let data = [
    { provider: 'local', name: 'Tavara Ky', email: 'tavara@test.com', password: 'test' },
    { provider: 'local', name: 'Sekavarakauppa Oy', email: 'sekatavarakauppa@test.com', password: 'test' },
    { provider: 'local', name: 'Suutari Tmi', email: 'suutari@test.com', password: 'test' }
  ];

  data.forEach(function(user) {
    companyPromises.push(User.create(user));  
  })  

  return companyPromises;
}

function initJobs(persons, companies, addresses) {
  let jobPromises = [];

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

  userJobs.forEach(job => {
    jobPromises.push(createJob(_.sample(persons), job, addresses));
  }); 
  companyJobs.forEach(job => {
    jobPromises.push(createJob(_.sample(persons), job, addresses));
  }); 

  return jobPromises;
};

function createJob(employer, title, addresses) {
  let address = _.sample(addresses);
  return Job.create({
    title : title,
    employer : employer.id, 
    employerName : employer.name,
    address: address 
  });
}