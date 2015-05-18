/// <reference path="../../../../typings/mocha/mocha.d.ts"/>
/* jshint -W117 */
'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var app = require('../../app');
var Job = require('./job.model');

var title1 = 'Test title';
var employer1 = 'Test title'; 

describe('Job model', function() {

  // Clear before testing begins
  before(function(done) {
    Job.remove().exec().then(function() {
      done();
    });
  });

  // Clear after each test case
  afterEach(function(done) {
    Job.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no jobs', function(done) {
    Job.find({}, function(err, jobs) {
      jobs.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate job', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err1) {
      should.not.exist(err1);
      var userDup = new Job(job);
      userDup.save(function(err2) {
        should.exist(err2);
        done();
      });
    });
  });

  it('should save job', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err1) {
      should.not.exist(err1);
      Job.find({}, function(err2, jobs) {
        should.not.exist(err2);
        jobs.should.have.length(1);
        done();
      });
    });
  });

  it('should find job with title', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err) {
      should.not.exist(err);
      Job.find({title: title1}, function(err, jobs) {
        should.not.exist(err);
        jobs.should.have.length(1);
        done();
      });
    });
  });
  
  it('should not find job with incorrect title', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err) {
      should.not.exist(err);
      Job.find({title: title1 + 'foo'}, function(err, jobs) {
        should.not.exist(err);
        jobs.should.have.length(0);
        done();
      });
    });
  });
  
  it('should find job with employer', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err) {
      should.not.exist(err);
      Job.find({employer: employer1}, function(err, jobs) {
        should.not.exist(err);
        jobs.should.have.length(1);
        done();
      });
    });
  });
  
  it('should delete job', function(done) {
    var job = new Job({title: title1, employer: employer1});
    job.save(function(err) {
      should.not.exist(err);
      Job.remove().exec()
        .then(function() {
          Job.find({}, function(err, jobs) {
            should.not.exist(err);
            jobs.should.have.length(0);
            done();
          });
        });
    });
  });
  

  //it('should fail when saving without an email', function(done) {
  //  job.email = '';
  //  job.save(function(err) {
  //    should.exist(err);
  //    done();
  //  });
  //});

});
