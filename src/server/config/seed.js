/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Job = require('../api/job/job.model');

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
